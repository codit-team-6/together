import {NextRequest, NextResponse} from 'next/server';

import {serverInstance} from '../../../apis/client';
import {CodeitError} from '../../../types/common/error.types';
import {AverageScoreList} from '../../../types/reviews/averageScores.types';

export const GET = async (request: NextRequest) => {
  const {searchParams} = new URL(request.url);

  try {
    const response = await serverInstance.get<AverageScoreList>({
      path: `/reviews/scores?${searchParams}`,
      options: {cache: 'no-store'},
    });

    // 응답 데이터가 빈 배열인 경우 처리
    if (!response || response.length === 0) {
      return NextResponse.json({
        teamId: '',
        type: '',
        oneStar: 0,
        twoStars: 0,
        threeStars: 0,
        fourStars: 0,
        fiveStars: 0,
        averageScore: 0,
      });
    }

    return Response.json(response[0]);
  } catch (error) {
    if (error instanceof CodeitError) {
      console.log('현재 error 객체', error.code);
      return NextResponse.json(
        {
          message: error.message || '리뷰 평점 가져오기 실패',
          code: error.code,
          parameter: error.parameter,
        },
        {status: error.status},
      );
    }
  }
  return NextResponse.json(
    {message: '리뷰 평점을 가져오는 중 알 수 없는 오류가 발생했습니다'},
    {status: 500},
  );
};
