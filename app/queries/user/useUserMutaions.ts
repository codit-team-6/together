'use client';

import {useMutation, useQueryClient} from '@tanstack/react-query';

import {useClearAuth} from '../../hooks/useAuth';
import {userQueryKey} from '../common/queryKeys';

export const useUserMutation = () => {
  const queryClient = useQueryClient();

  const logout = () => {
    const {clearAuth} = useClearAuth();
    return useMutation({
      mutationFn: clearAuth,
      onSuccess: () => {
        queryClient.setQueryData(userQueryKey.myInfo(), null);
      },
    });
  };

  return {logout};
};
