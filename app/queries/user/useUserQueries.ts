import {useQuery} from '@tanstack/react-query';

import {getUserInfo} from '../../apis/user/userApi';
import {userQueryKey} from '../common/queryKeys';

// userInfo Query
export const useUserQuery = () => {
  const getMyInfo = () => {
    return useQuery({
      queryKey: userQueryKey.myInfo(),
      queryFn: getUserInfo,
    });
  };

  return {getMyInfo};
};
