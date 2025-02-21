import {NextRequest, NextResponse} from 'next/server';

import {serverInstance} from '../../../../apis/client';
import {AUTH_TOKEN} from '../../../../constants/service';

export async function PUT(request: NextRequest) {
  const token = request.cookies.get(AUTH_TOKEN)?.value;

  if (!token) {
    return NextResponse.json({message: '토큰이 없습니다.'}, {status: 400});
  }

  try {
    const formData = await request.formData();
    const body = new FormData();

    formData.forEach((value, key) => {
      body.append(key, value);
    });

    await serverInstance.put({
      path: '/auths/user',
      body,
      token,
      contentType: 'formData', // Content-Type 설정
    });

    return NextResponse.json({message: '회원 정보 수정 성공'}, {status: 200});
  } catch (error) {
    return NextResponse.json(
      {
        message: '회원 정보 수정 중 오류가 발생했습니다.',
      },
      {status: 500},
    );
  }
}
