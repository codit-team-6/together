import {NextRequest, NextResponse} from 'next/server';

import {getUserInfoInServer} from '../../../../apis/userApi';
import {AUTH_TOKEN} from '../../../../constants/service';
import {CodeitError} from '../../../../types/common/error.types';

export async function GET(request: NextRequest) {
  const token = request.cookies.get(AUTH_TOKEN);
  // const instance = new FetchInstance({token: token?.value});

  try {
    // const userInfoResponse = await instance.get<UserInfoResponse>({});
    const userInfoResponse = await getUserInfoInServer(token?.value);

    return Response.json(
      {message: '로그인 성공', data: userInfoResponse},
      {
        status: 200,
      },
    );
  } catch (error) {
    // 일반적인 에러인 경우
    if (error instanceof CodeitError) {
      console.log('현재 error 객체', error.code);
      return NextResponse.json(
        {message: error.message, code: error.code, parameter: error.parameter},
        {status: error.status},
      );
    }
    // 예상치 못한 에러인 경우
    return NextResponse.json({message: '알 수 없는 오류가 발생했습니다'}, {status: 500});
  }
}
