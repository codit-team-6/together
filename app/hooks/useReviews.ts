import {useQuery} from '@tanstack/react-query';

import {getReviews} from '../apis/reviewsApi';
import {ReviewParams} from '../types/reviews/reviews.types';

export function useReviews(gatheringId: number) {
  return useQuery({
    queryKey: ['reviews', gatheringId],
    queryFn: async () => {
      const params: ReviewParams = {
        gatheringId,
        limit: 10,
        offset: 0,
      };
      return getReviews(params);
    },
  });
}
