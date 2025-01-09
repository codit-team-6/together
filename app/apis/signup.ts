import { NextResponse } from 'next/server';

export const POST = async (req: Request) => {
  try {
    const body = await req.json();
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auths/signup`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      },
    );

    // API 응답 상태 확인
    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { message: errorData.message || '회원가입 실패' },
        { status: response.status },
      );
    }

    return NextResponse.json({ message: '회원가입 성공' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: '회원가입 실패' }, { status: 500 });
  }
};