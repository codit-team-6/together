import {useQuery} from '@tanstack/react-query';

import {getUserInfo} from '../../apis/userApi';
import {userQueryKey} from '../common/queryKeys';

// userInfo Query
// Todo: createGathering 참고해서 코드 개선하기
export const useUserQuery = () => {
  const getMyInfo = () => {
    return useQuery({
      queryKey: userQueryKey.myInfo(),
      queryFn: getUserInfo,
    });
  };

  return {getMyInfo};
};
