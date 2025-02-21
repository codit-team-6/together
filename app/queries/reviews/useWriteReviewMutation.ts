import {useMutation, useQueryClient} from '@tanstack/react-query';

import {writeReview} from '../../apis/reviewsApi';
import {gatheringsQueryKey, reviewListQuery} from '../common/queryKeys';

export const useWriteReviewMutation = () => {
  const queryClient = useQueryClient();

  const writeReviewMutation = useMutation({
    mutationFn: async ({
      gatheringId,
      rating,
      comment,
    }: {
      gatheringId: number;
      rating: number;
      comment: string;
    }) => {
      await writeReview(gatheringId, rating, comment);
    },
    onSuccess: (_, {gatheringId}) => {
      queryClient.invalidateQueries({
        queryKey: reviewListQuery.getReviewList({gatheringId}).queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: reviewListQuery.getGatheringReviewList({gatheringId}).queryKey,
      });
      queryClient.invalidateQueries({queryKey: gatheringsQueryKey.joinedGatherings().queryKey});
    },
  });

  return {writeReviewMutation};
};
