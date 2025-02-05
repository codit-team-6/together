import {Gathering} from '../../types/common/gatheringFilter.types';
import {ReviewListType} from '../../types/common/reviews.types';
import {AverageScoreList} from '../../types/reviews/averageScores.types';
import {GetReviewsProps} from '../../types/reviews/reviewsApi.types';
import {clientInstance} from '../client';

// 마이페이지-나의 리뷰는 userId를 보내야함.
// 모임 상세 페에지는 gatheringId를 보내야함.
export async function getReviews({
  userId,
  gatheringId,
  gatheringType,
  location,
  date,
  sortBy,
  sortOrder,
}: GetReviewsProps): Promise<ReviewListType> {
  const queryParams = new URLSearchParams();

  // 기본값
  // queryParams.append('sortOrder', 'desc');

  // 선택적 매개변수
  if (userId) queryParams.append('userId', userId.toString());
  if (gatheringId) queryParams.append('gatheringId', gatheringId.toString());
  if (gatheringType) queryParams.append('type', gatheringType);
  if (location) queryParams.append('location', location);
  if (date) queryParams.append('date', date);
  if (sortBy) queryParams.append('sortBy', sortBy);
  if (sortOrder) queryParams.append('sortOrder', sortOrder);

  const response = await fetch(`/route/reviews?${queryParams.toString()}`);
  return response.json();
}

export async function getReviewsScore({
  gatheringType,
}: {
  gatheringType: Gathering;
}): Promise<AverageScoreList> {
  const queryParams = new URLSearchParams();
  if (gatheringType) queryParams.append('type', gatheringType);

  const response = await fetch(`/route/reviews/scores?${queryParams.toString()}`);
  return response.json();
}

export async function writeReview(gatheringId: number, score: number, comment: string) {
  try {
    await clientInstance.post({path: '/route/token/reviews', body: {gatheringId, score, comment}});
  } catch (error) {
    console.log('리뷰 작성 중 에러 발생');
    throw error;
  }
}
