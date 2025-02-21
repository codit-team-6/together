import {NextRequest, NextResponse} from 'next/server';

import {serverInstance} from '../../../apis/client';
import {AUTH_TOKEN} from '../../../constants/service';

export async function POST(request: NextRequest) {
  const token = request.cookies.get(AUTH_TOKEN)?.value;
  if (!token) {
    return NextResponse.json({message: '인증 토큰이 없습니다.'}, {status: 401});
  }

  const body = await request.json();
  try {
    await serverInstance.post({
      path: `/reviews`,
      body,
      token,
    });
    return NextResponse.json({message: '리뷰 작성 성공'}, {status: 200});
  } catch (error) {
    return NextResponse.json({message: '리뷰 작성 중 오류가 발생 했습니다'}, {status: 500});
  }
}
