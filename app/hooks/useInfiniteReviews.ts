import {useInfiniteQuery} from '@tanstack/react-query';

import {reviewListQuery} from '../queries/common/queryKeys';

export function useInfiniteReviews(userId: number) {
  return useInfiniteQuery({
    queryKey: ['reviewedGatherings', userId],
    queryFn: async ({pageParam = 0}) => {
      const response = await reviewListQuery
        .getMyReviewList({
          userId,
          sortOrder: 'desc',
          offset: pageParam,
          limit: 10,
        })
        .queryFn();
      return response?.data ?? [];
    },
    initialPageParam: 0,
    getNextPageParam: lastPage => (lastPage.length === 10 ? lastPage.length : undefined),
    enabled: !!userId,
  });
}
