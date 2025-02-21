import {toast} from 'react-toastify';

import {useMutation, useQueryClient} from '@tanstack/react-query';

import {leaveJoinedGatherings} from '../../apis/gatheringApi';
import {gatheringsQueryKey} from '../common/queryKeys';

// eslint-disable-next-line prettier/prettier
export const useLeaveGatheringMutation = () => {
  const queryClient = useQueryClient();

  const leaveGatheringMutation = useMutation({
    mutationFn: async ({gatheringId, userId}: {gatheringId: number; userId: number}) => {
      await leaveJoinedGatherings(gatheringId, userId);
    },
    onSuccess: (_, {gatheringId}) => {
      toast.success('예약이 취소되었습니다.');

      queryClient.invalidateQueries({queryKey: gatheringsQueryKey.joinedGatherings().queryKey});
      queryClient.invalidateQueries({queryKey: gatheringsQueryKey.GatheringDetails(gatheringId)});
    },
  });

  return {leaveGatheringMutation};
};
