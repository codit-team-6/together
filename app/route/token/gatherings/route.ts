import {NextRequest, NextResponse} from 'next/server';

import {serverInstance} from '../../../apis/client';
import {AUTH_TOKEN} from '../../../constants/service';
import {CodeitError} from '../../../types/common/error.types';

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get(AUTH_TOKEN)?.value;

    console.log(request.headers);
    const formData = await request.formData();
    console.log(formData);

    const response = await serverInstance.post({
      path: `/gatherings`,
      body: formData,
      token,
      contentType: 'formData',
    });

    return NextResponse.json({data: response, message: '모임 생성 성공'}, {status: 200});
  } catch (error) {
    // 일반적인 에러인 경우
    if (error instanceof CodeitError) {
      console.log('현재 error 객체', error.code, error.message);
      return NextResponse.json(
        {message: error.message || '모임 생성 실패', code: error.code, parameter: error.parameter},
        {status: error.status},
      );
    }
    // 예상치 못한 에러인 경우
    return NextResponse.json(
      {message: '모임 생성 중 알 수 없는 오류가 발생했습니다'},
      // {message: error},
      {status: 500},
    );
  }
}
