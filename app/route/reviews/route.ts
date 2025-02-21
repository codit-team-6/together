import {NextRequest, NextResponse} from 'next/server';

import {serverInstance} from '../../apis/client';
import {CodeitError} from '../../types/common/error.types';

export const GET = async (request: NextRequest) => {
  const {searchParams} = new URL(request.url);

  try {
    const response = await serverInstance.get({
      path: `/reviews?${searchParams}`,
      options: {cache: 'no-store'},
    });
    return Response.json(response);
  } catch (error) {
    if (error instanceof CodeitError) {
      console.log('현재 error 객체', error.code);
      return NextResponse.json(
        {
          message: error.message || '리뷰 가져오기 실패',
          code: error.code,
          parameter: error.parameter,
        },
        {status: error.status},
      );
    }

    // const response = await fetch();
    // const data = await response.json();
    // return NextResponse.json(data);
    // 예상치 못한 에러인 경우
  }
  return NextResponse.json(
    {message: '리뷰를 가져오는 중 알 수 없는 오류가 발생했습니다'},
    {status: 500},
  );
};
