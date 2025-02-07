import {NextRequest, NextResponse} from 'next/server';

import {getGatheringsInServer} from '../../../apis/gatherings/gatheringApi';
import {GatheringsFilter} from '../../../types/gatherings/filters';

export async function GET(request: NextRequest) {
  try {
    const {searchParams} = new URL(request.url);
    const filters: GatheringsFilter = Object.fromEntries(searchParams.entries());

    const response = await getGatheringsInServer(filters);

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
