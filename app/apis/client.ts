import {CodeitError, CodeitErrorStatus} from '../types/common/error.types';

/** token: 서버 컴포넌트에서 데이터 요청 시 필요한 변수, 서버 컴포넌트에서는 fetch를 요청할 때는  */
interface FetchOptions extends RequestInit {
  baseURL: string;
  timeout?: number;
  contentType?: 'formData' | 'json';
}

// Todo: error 관련해서 수정하기
// Todo: timeout 관련해서 공부하고 적용하기
class FetchInstance {
  private timeout: number;

  private baseURL: string;

  private token: string | undefined;

  private contentType: 'formData' | 'json';

  private defaultHeaders: HeadersInit;

  constructor(options: FetchOptions) {
    this.timeout = options.timeout || 30000;
    this.contentType = options.contentType || 'json';
    this.baseURL = options.baseURL;
    this.defaultHeaders = {
      ...options.headers,
    };
  }

  // 최종 fetch 요청을 보내는 부분
  private async fetchWithTimeout(url: string, options: RequestInit): Promise<Response> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);
    try {
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      return response;
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  // token, contentType에 따라 맞춤 Header 추가
  private getHeaders(): Headers {
    const requestHeaders = new Headers(this.defaultHeaders);
    if (this.token) {
      requestHeaders.set('Authorization', `Bearer ${this.token}`);
    }

    // FormData의 경우에는 브라우저에서 Content-Type 자동 설정
    // JSON 데이터일 경우에만 Content-Type 설정
    if (this.contentType === 'json') {
      requestHeaders.set('Content-Type', 'application/json');
    }
    return requestHeaders;
  }

  // 각 메소드(GET, POST, DELETE, PUT) method 내부에서 호출되는 fetch 수행 method
  async request<T>(
    method: string,
    path?: string,
    options: RequestInit = {},
    token?: string | undefined,
    contentType?: 'json' | 'formData',
  ): Promise<T> {
    this.token = token;
    this.contentType = contentType || 'json';
    const url = this.baseURL + path;
    const requestHeaders = this.getHeaders();

    try {
      const response = await this.fetchWithTimeout(url.toString(), {
        ...options,
        method,
        headers: requestHeaders,
      });

      console.log('fetch 응답 결과 status', response.status);

      if (!response.ok) {
        throw await FetchInstance.handleError(response);
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('Request timeout');
        }
      }
      throw error;
    }
  }

  // 에러 처리를 담당하는 로직
  private static async handleError(response: Response): Promise<Error | CodeitError> {
    try {
      const data = await response.json();
      return new CodeitError(
        data.message,
        response.status as CodeitErrorStatus,
        data.code,
        data.parameter,
      );
    } catch (error) {
      return new Error();
    }
  }

  // HTTP method helpers
  async get<T>({
    path,
    options,
    token,
    contentType,
  }: {
    path: string;
    options?: RequestInit;
    token?: string | undefined;
    contentType?: 'json' | 'formData';
  }): Promise<T> {
    return this.request<T>('GET', path, options, token, contentType);
  }

  async post<T>({
    path,
    body,
    options,
    token,
    contentType,
  }: {
    path: string;
    body?: unknown;
    options?: RequestInit;
    token?: string | undefined;
    contentType?: 'json' | 'formData';
  }): Promise<T> {
    // body가 없다면 undefined로 넘어갈 것
    let formattedBody: BodyInit | undefined;

    // body가 있다면 케이스에 맞게 처리
    if ((contentType === 'json' || contentType === undefined) && body) {
      formattedBody = JSON.stringify(body); // json의 경우 처리 해줌
    } else if (contentType === 'formData' && body instanceof FormData) {
      formattedBody = body; // formData는 그대로 사용
    }

    return this.request<T>(
      'POST',
      path,
      {
        ...options,
        body: formattedBody,
      },
      token,
      contentType,
    );
  }

  async put<T>({
    path,
    body,
    options,
    token,
    contentType,
  }: {
    path: string;
    body?: unknown;
    options?: RequestInit;
    token?: string | undefined;
    contentType?: 'json' | 'formData';
  }): Promise<T> {
    // body가 없다면 undefined로 넘어갈 것
    let formattedBody: BodyInit | undefined;

    // body가 있다면 케이스에 맞게 처리
    if (contentType === 'json' && body) {
      formattedBody = JSON.stringify(body); // json의 경우 처리 해줌
    } else if (contentType === 'formData' && body instanceof FormData) {
      formattedBody = body; // formData는 그대로 사용
    }

    return this.request<T>(
      'PUT',
      path,
      {
        ...options,
        body: formattedBody,
      },
      token,
      contentType,
    );
  }

  async delete<T>({
    path,
    options,
    token,
    contentType,
  }: {
    path: string;
    options?: RequestInit;
    token?: string | undefined;
    contentType?: 'json' | 'formData';
  }): Promise<T> {
    return this.request<T>('DELETE', path, options, token, contentType);
  }
}

const clientInstance = new FetchInstance({
  baseURL: `${process.env.NEXT_PUBLIC_FRONT_URL}`,
});

const serverInstance = new FetchInstance({
  baseURL: `${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_TEAM_ID}`,
});

export {clientInstance, serverInstance};
