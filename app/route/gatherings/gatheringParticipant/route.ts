import {NextRequest, NextResponse} from 'next/server';

import {getUserFromGatheringInServer} from '../../../apis/gatherings/gatheringApi';

export async function GET(request: NextRequest) {
  try {
    const {searchParams} = new URL(request.url);
    const gatheringId = searchParams.get('gatheringId');

    const response = await getUserFromGatheringInServer(Number(gatheringId));

    return NextResponse.json({message: '모임 조회 성공', data: response}, {status: 200});
  } catch (error) {
    return NextResponse.json(
      {
        message: '모임 조회 중 오류가 발생했습니다.',
        error: error instanceof Error ? error.message : error,
      },
      {status: 500},
    );
  }
}
