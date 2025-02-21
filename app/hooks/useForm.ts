import {useCallback} from 'react';
import {UseFormTrigger} from 'react-hook-form';

import _ from 'lodash';

import {LoginInputsType} from '../types/users/auth.types';

export const useDebounce = () => {
  const debounceValidate = useCallback(
    _.debounce(async (field: keyof LoginInputsType, trigger: UseFormTrigger<LoginInputsType>) => {
      await trigger(field);
    }, 1000),
    [],
  );

  return {debounceValidate};
};
