'use client';

import {useQuery} from '@tanstack/react-query';

import {getReviewsScore} from '../../apis/reviewsApi';
import {GatheringWithoutAll} from '../../types/gatherings/gatheringOptions.types';
import {AverageScore} from '../../types/reviews/averageScores.types';
import {GetReviewsProps} from '../../types/reviews/reviewsApi.types';

import {AverageScores} from './averageScores';

type AverageScoresWrapperProps = {
  filter: GetReviewsProps;
};
export default function AverageScoresWrapper({filter}: AverageScoresWrapperProps) {
  // 두 번째 쿼리: 리뷰 점수 가져오기
  const {type} = filter;
  const {data: scoreData} = useQuery<AverageScore>({
    queryKey: ['reviewScores', type],
    queryFn: () => getReviewsScore(type as GatheringWithoutAll),
  });

  return <div className="mt-6">{scoreData && <AverageScores {...scoreData} />}</div>;
}
