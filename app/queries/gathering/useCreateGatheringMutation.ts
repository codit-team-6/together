import {SetStateAction} from 'react';
import {toast} from 'react-toastify';

import {useMutation} from '@tanstack/react-query';

import {createGathering, postJoinGathering} from '../../apis/gatheringApi';
import {CodeitError} from '../../types/common/error.types';

export const useJoinGatheringMutation = () => {
  return useMutation({
    mutationFn: postJoinGathering,
  });
};

// eslint-disable-next-line prettier/prettier
export const useCreateGatheringMutation = <T,>(
  setErrorMessage: React.Dispatch<SetStateAction<T>>,
) => {
  const createGatheringMutation = useMutation({
    mutationFn: createGathering,
    onSuccess: () => {
      toast.success('모임 생성 성공');
    },
    onError: error => {
      if (error instanceof CodeitError) {
        const {parameter, message} = error;
        if (parameter) {
          setErrorMessage(prev => ({...prev, [parameter]: message}));
        }
      }
    },
  });

  return {createGatheringMutation};
};
