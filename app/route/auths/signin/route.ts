import {NextRequest, NextResponse} from 'next/server';

import {serverInstance} from '../../../apis/client';
import {AUTH_TOKEN, TOKEN_EXPIRE_TIME} from '../../../constants/service';
import {CodeitError} from '../../../types/common/error.types';

type LoginResponse = {
  token: string;
};

export async function POST(request: NextRequest) {
  const body = await request.json();

  try {
    const codeitLoginResponse = await serverInstance.post<LoginResponse>({
      path: '/auths/signin',
      body,
    });
    // const codeitLoginResponse = await fetch(
    //   `${process.env.NEXT_PUBLIC_BASE_URL}/${process.env.NEXT_PUBLIC_TEAM_ID}/auths/signin`,
    //   {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json',
    //     },
    //     body: JSON.stringify(body),
    //   },
    // );
    return Response.json(
      {message: '로그인 성공'},
      {
        status: 200,
        headers: {
          'Set-Cookie': `${AUTH_TOKEN}=${codeitLoginResponse.token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${TOKEN_EXPIRE_TIME}`,
          // 배포 후 https 환경에서 사용하도록
          // 'Set-Cookie': `auth-token=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${60 * 60 * 24 * 7}`,
        },
      },
    );
  } catch (error) {
    // 일반적인 에러인 경우
    if (error instanceof CodeitError) {
      console.log('현재 error 객체', error.code, error.status);
      return NextResponse.json(
        {message: error.message || '로그인 실패', code: error.code, parameter: error.parameter},
        {status: error.status},
      );
    }
    // 예상치 못한 에러인 경우
    return NextResponse.json({message: '로그인 중 알 수 없는 오류가 발생했습니다'}, {status: 500});
  }
}
