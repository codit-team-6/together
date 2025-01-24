import {NextRequest, NextResponse} from 'next/server';

import {
  getJoinedGatheringsInServer,
  leaveJoinedGatheringsInServer,
} from '../../../../apis/gatherings/gatheringApi';
import {AUTH_TOKEN} from '../../../../constants/auth';

export async function GET(request: NextRequest) {
  const token = request.cookies.get(AUTH_TOKEN)?.value;

  try {
    const gatherings = await getJoinedGatheringsInServer(token!);

    return NextResponse.json({message: '참여중인 모임 조회 성공', data: gatherings}, {status: 200});
  } catch (error) {
    console.error('Error fetching joined gatherings:', error);
    return NextResponse.json(
      {message: '참여중인 모임 조회 중 오류가 발생했습니다.'},
      {status: 500},
    );
  }
}

export async function DELETE(request: NextRequest) {
  const token = request.cookies.get(AUTH_TOKEN)?.value;

  const {searchParams} = new URL(request.url);
  const gatheringId = Number(searchParams.get('gatheringId'));

  if (!gatheringId) {
    return NextResponse.json(
      {message: '유효하지 않은 요청입니다. gatheringId가 필요합니다.'},
      {status: 400},
    );
  }

  try {
    await leaveJoinedGatheringsInServer(token!, gatheringId);
    return NextResponse.json({message: '참여한 모임 삭제 성공'}, {status: 200});
  } catch (error) {
    return NextResponse.json({message: '참여한 모임 삭제 중 오류가 발생했습니다.'}, {status: 500});
  }
}
