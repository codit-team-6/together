import {NextRequest, NextResponse} from 'next/server';

import {
  getGatherings,
  getJoinedGatheringsInServer,
  leaveJoinedGatheringsInServer,
} from '../../../../apis/gatherings/gatheringApi';
import {AUTH_TOKEN} from '../../../../constants/auth';

export async function GET(request: NextRequest) {
  const token = request.cookies.get(AUTH_TOKEN)?.value;

  const {searchParams} = new URL(request.url);
  const filters: Record<string, string> = {};
  searchParams.forEach((value, key) => {
    filters[key] = value;
  });

  try {
    const response = await getJoinedGatheringsInServer(token!, filters);

    return NextResponse.json({message: '참여중인 모임 조회 성공', data: response}, {status: 200});
  } catch (error) {
    return NextResponse.json(
      {message: '참여중인 모임 조회 중 오류가 발생했습니다.'},
      {status: 500},
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const token = request.cookies.get(AUTH_TOKEN)?.value;
    if (!token) {
      return NextResponse.json({message: '인증 정보가 필요합니다.'}, {status: 401});
    }

    const {searchParams} = new URL(request.url);
    const gatheringId = Number(searchParams.get('gatheringId'));

    if (!gatheringId) {
      return NextResponse.json(
        {message: '유효하지 않은 요청입니다. gatheringId가 필요합니다.'},
        {status: 400},
      );
    }

    const [gathering] = await getGatherings({id: gatheringId});

    if (!gathering) {
      return NextResponse.json({message: '해당 모임 정보를 찾을 수 없습니다.'}, {status: 404});
    }

    // const userId = request.cookies.get('userId')?.value; // 쿠키에서 userId를 추출해서 사용하는건 위험
    const userId = Number(searchParams.get('userId'));
    console.log('userId:', userId);
    if (!userId) {
      return NextResponse.json({message: '사용자 정보를 확인할 수 없습니다.'}, {status: 403});
    }

    if (gathering.createdBy === Number(userId)) {
      // TODO: 에러 모달 or alert로 처리
      return NextResponse.json(
        {message: '모임의 생성자는 모임을 떠날 수 없습니다.'},
        {status: 403},
      );
    }

    await leaveJoinedGatheringsInServer(token, gatheringId);

    return NextResponse.json({message: '참여한 모임 삭제 성공'}, {status: 200});
  } catch (error) {
    console.error('참여한 모임 삭제 중 에러 발생:', error);
    return NextResponse.json({message: '참여한 모임 삭제 중 오류가 발생했습니다.'}, {status: 500});
  }
}
