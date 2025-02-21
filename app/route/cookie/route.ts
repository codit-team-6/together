// Todo: 배포 환경에 따라 쿠키 설정 및 env 파일 적용 다르게 처리

import {AUTH_TOKEN, TOKEN_EXPIRE_TIME} from '../../constants/service';

// Cookie 생성
export async function GET(request: Request) {
  const token = request.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return Response.json({error: 'Token is missing'}, {status: 401});
  }

  // 응답 생성과 쿠키 설정
  const response = Response.json(
    {message: 'Token stored in cookie'},
    {
      status: 200,
      headers: {
        'Set-Cookie': `${AUTH_TOKEN}=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=${TOKEN_EXPIRE_TIME}`,
        // 배포 후 https 환경에서 사용하도록
        // 'Set-Cookie': `auth-token=${token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${60 * 60 * 24 * 7}`,
      },
    },
  );

  return response;
}

// Cookie 삭제
export async function DELETE() {
  return Response.json(
    {message: 'Token removed'},
    {
      headers: {
        'Set-Cookie': 'auth-token=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0',
        // 배포 후 https 환경에서 사용하도록
        // 'Set-Cookie': 'auth-token=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0',
      },
    },
  );
}
