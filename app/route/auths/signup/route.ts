import {NextRequest, NextResponse} from 'next/server';

import {serverInstance} from '../../../apis/client';
import {CodeitError} from '../../../types/common/error.types';

export const POST = async (request: NextRequest) => {
  const body = await request.json();

  try {
    if (!body.name || !body.email || !body.companyName || !body.password) {
      return NextResponse.json({message: '필수 데이터가 누락되었습니다.'}, {status: 400});
    }

    const response = await serverInstance.post<{message: string}>({
      path: '/auths/signup',
      body,
    });

    return NextResponse.json(
      {message: response.message || '회원가입 성공'},
      {
        status: 200,
      },
    );
  } catch (error) {
    if (error instanceof CodeitError) {
      console.log('현재 error 객체', error.code);
      return NextResponse.json(
        {message: error.message || '회원가입 실패', code: error.code, parameter: error.parameter},
        {status: error.status},
      );
    }
    return NextResponse.json(
      {message: '회원가입 중 알 수 없는 오류가 발생했습니다'},
      {status: 500},
    );
  }
};
