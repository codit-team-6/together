import {CodeitError} from '../types/common/error.types';
import {GatheringWithoutAll} from '../types/gatherings/gatheringOptions.types';
import {AverageScore} from '../types/reviews/averageScores.types';
import {ReviewListType} from '../types/reviews/reviews.types';
import {
  GetGatheringReviewsProps,
  GetMyReviewsProps,
  GetReviewsProps,
} from '../types/reviews/reviewsApi.types';
import {buildQueryParams} from '../utils/buildQueryParams';

import {clientInstance, serverInstance} from './client';

// 서비스 내 보든 리뷰
export const getReviews = async (props: GetReviewsProps): Promise<ReviewListType> => {
  const queryParam = buildQueryParams({
    ...props,
  });

  try {
    const response = await clientInstance.get<ReviewListType>({
      path: `/route/reviews?${queryParam.toString()}`,
    });
    return response;
  } catch (error) {
    console.log('현재 error 객체', error);
    return {
      data: [],
      totalItemCount: 0,
      currentPage: 0,
      totalPages: 0,
    };
  }
};

// 마이페이지-나의 리뷰는 userId를 보내야함.
export const getMyReviews = async (props: GetMyReviewsProps): Promise<ReviewListType> => {
  const queryParams = buildQueryParams({
    userId: props.userId,
    sortOrder: props.sortOrder,
  });

  try {
    const response = await clientInstance.get<ReviewListType>({
      path: `/route/reviews?${queryParams.toString()}`,
    });
    return response;
  } catch (error) {
    console.log('현재 error 객체', error);
    return {
      data: [],
      totalItemCount: 0,
      currentPage: 0,
      totalPages: 0,
    };
  }
};

// 모임 상세 페에지는 gatheringId를 보내야함.
export const getGatheringReviews = async (
  props: GetGatheringReviewsProps,
): Promise<ReviewListType> => {
  const filteredParams = Object.fromEntries(
    Object.entries({
      gatheringId: props.gatheringId,
      sortOrder: props.sortOrder,
      limit: props.limit,
      offset: props.offset,
    }).filter(([, value]) => value !== undefined),
  ) as Record<string, string | number>;

  const queryParams = buildQueryParams(filteredParams);

  try {
    const response = await clientInstance.get<ReviewListType>({
      path: `/route/reviews?${queryParams.toString()}`,
    });
    return response;
  } catch (error) {
    console.log('현재 error 객체', error);
    return {
      data: [],
      totalItemCount: 0,
      currentPage: 0,
      totalPages: 0,
    };
  }
};

export const getGatheringReviewsInServer = async (
  props: GetGatheringReviewsProps,
): Promise<ReviewListType> => {
  const filteredParams = Object.fromEntries(
    Object.entries({
      gatheringId: props.gatheringId,
      sortOrder: props.sortOrder,
      limit: props.limit,
      offset: props.offset,
    }).filter(([, value]) => value !== undefined),
  ) as Record<string, string | number>;

  const queryParams = buildQueryParams(filteredParams);

  try {
    const response = await serverInstance.get<ReviewListType>({
      path: `/reviews?${queryParams.toString()}`,
    });
    return response;
  } catch (error) {
    console.log('현재 error 객체', error);
    return {
      data: [],
      totalItemCount: 0,
      currentPage: 0,
      totalPages: 0,
    };
  }
};

export const getReviewsScore = async (type: GatheringWithoutAll): Promise<AverageScore> => {
  const queryParams = new URLSearchParams();
  if (type) queryParams.append('type', type);

  try {
    const response = await clientInstance.get<AverageScore>({
      path: `/route/reviews/scores?${queryParams.toString()}`,
    });
    return response;
  } catch (error) {
    if (error instanceof CodeitError) {
      console.log('현재 error 객체', error.code);
      return {
        teamId: '',
        type: '',
        oneStar: 0,
        twoStars: 0,
        threeStars: 0,
        fourStars: 0,
        fiveStars: 0,
        averageScore: 0,
      };
    }
    return {
      teamId: '',
      type: '',
      oneStar: 0,
      twoStars: 0,
      threeStars: 0,
      fourStars: 0,
      fiveStars: 0,
      averageScore: 0,
    };
  }
};

export async function writeReview(gatheringId: number, score: number, comment: string) {
  try {
    await clientInstance.post({path: '/route/token/reviews', body: {gatheringId, score, comment}});
  } catch (error) {
    console.log('리뷰 작성 중 에러 발생');
    throw error;
  }
}
