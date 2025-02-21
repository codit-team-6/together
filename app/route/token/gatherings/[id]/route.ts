/* eslint-disable @typescript-eslint/no-explicit-any */
import {NextRequest, NextResponse} from 'next/server';

import {
  leaveJoinedGatheringsInServer,
  postJoinGatheringInServer,
  putCancelGatheringInServer,
} from '../../../../apis/gatheringApi';
import {AUTH_TOKEN} from '../../../../constants/service';
import {CodeitError} from '../../../../types/common/error.types';

export const POST = async (request: NextRequest) => {
  try {
    const {id} = await request.json();
    const token = request.cookies.get(AUTH_TOKEN)?.value;

    if (!token) {
      return NextResponse.json({message: '인증 토큰이 없습니다.'}, {status: 401});
    }
    console.log('로그인 성공🥳');
    const response = await postJoinGatheringInServer(token, Number(id));
    console.log('서버에서 받은 응답', response);

    return NextResponse.json({message: '모임 참여 성공', data: response}, {status: 200});
  } catch (error: any) {
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
};

export const DELETE = async (request: NextRequest) => {
  try {
    const url = new URL(request.url);
    const id = url.pathname.split('/').pop(); // 경로의 마지막 부분 가져오기
    const token = request.cookies.get(AUTH_TOKEN)?.value;

    if (!token) {
      return NextResponse.json({message: '인증 토큰이 없습니다.'}, {status: 401});
    }
    console.log('로그인 성공🥳');
    const response = await leaveJoinedGatheringsInServer(token, Number(id));
    console.log('서버에서 받은 응답', response);

    return NextResponse.json({message: '모임 떠나기기 성공', data: response}, {status: 200});
  } catch (error: any) {
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
};

export const PUT = async (request: NextRequest, {params}: {params: Promise<{id: string}>}) => {
  try {
    const {id} = await params;
    console.log(id);

    const token = request.cookies.get(AUTH_TOKEN)?.value;

    if (!token) {
      return NextResponse.json({message: '인증 토큰이 없습니다.'}, {status: 401});
    }
    console.log('로그인 성공🥳');
    const response = await putCancelGatheringInServer(token, Number(id));
    console.log('서버에서 받은 응답', response);

    return NextResponse.json({message: '모임 취소 성공', data: response}, {status: 200});
  } catch (error: any) {
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
};
