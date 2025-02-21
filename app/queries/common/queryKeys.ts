/* eslint-disable prettier/prettier */

import {getGatherings, getJoinedGatherings, getUserFromGathering} from '../../apis/gatheringApi';
import {getGatheringReviews, getMyReviews, getReviews, writeReview} from '../../apis/reviewsApi';
import {Gathering} from '../../types/gatherings/gatheringOptions.types';
import {
  GetGatheringReviewsProps,
  GetMyReviewsProps,
  GetReviewsProps,
} from '../../types/reviews/reviewsApi.types';
import {myGatheringSort} from '../../utils/myGatheringSort';

// Todo: 아래 형식에 맞춰서 통일시켜주기
// 'info'와 같이 callback 함수로 작성하면 매개변수를 받아 매개변수에 맞는 queryKey를 생성할 수 있다.
export const userQueryKey = {
  all: ['user'] as const,
  myInfo: () => [...userQueryKey.all, 'info'] as const,
};

export const reviewListQuery = {
  all: ['reviewList'] as const,
  getQueryKey: <T,>(params: T) => [...reviewListQuery.all, JSON.stringify(params)] as const,

  getReviewList: (params: GetReviewsProps) => ({
    queryKey: reviewListQuery.getQueryKey(params),
    queryFn: () => getReviews(params),
  }),

  getMyReviewList: (params: GetMyReviewsProps) => ({
    queryKey: reviewListQuery.getQueryKey(params),
    queryFn: () => getMyReviews(params),
  }),
  getGatheringReviewList: (params: GetGatheringReviewsProps) => ({
    queryKey: reviewListQuery.getQueryKey(params),
    queryFn: () => getGatheringReviews(params),
  }),
  writeReview: (params: {gatheringId: number; score: number; comment: string}) => ({
    queryKey: reviewListQuery.getQueryKey(params),
    queryFn: () => writeReview(params.gatheringId, params.score, params.comment),
  }),
};

export const gatheringsQueryKey = {
  all: ['gatherings'] as const,
  joinedGatherings: () => ({
    queryKey: ['joinedGatherings'] as const,
    queryFn: async () => myGatheringSort(await getJoinedGatherings()),
  }),
  GatheringDetails: (id: number) => ['gathering', id] as const,
  gatheringParticipants: (id: number) => ({
    queryKey: ['gatheringParticipants', id] as const,
    queryFn: () => getUserFromGathering(id),
  }),
  likedGatherings: (gatheringType: Gathering, id: string) => ({
    queryKey: ['likedGatherings', gatheringType, id] as const,
    queryFn: () => getGatherings({id, type: gatheringType || ''}),
    enabled: !!id,
  }),
};
