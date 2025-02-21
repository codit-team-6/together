'use client';

import {useEffect} from 'react';

import {useQueryClient} from '@tanstack/react-query';

import {userQueryKey} from '../../../queries/common/queryKeys';

// AuthCleaner가 없으면 유저 정보를 React-query로 관리하는데 토큰이 만료되더라도 GNB 컴포넌트는 해당 정보가 반영이 안되어서 계속 유저 프로필을 띄우는 문제가 발생하게 된다.
// 이런 문제를 해결하기 위해 AuthCleaner 컴포넌트 개발

// # 재현 시나리오
// 1. 로그인
// 2. 개발자 도구에서 token 삭제
// 3. 프로필 드롭다운에서 마이페이지 버튼 클릭
// 4. token이 없음으로 login 페이지로 redirect
// 5. 이 경우 GNB에는 로그인 버튼이 떠야하는데 회원정보가 그대로 남아있게 된다.
function GuestOnlyLayout({children}: {children: React.ReactNode}) {
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.setQueryData(userQueryKey.myInfo(), null);

    return () => {};
  }, [queryClient]);

  return children;
}

export default GuestOnlyLayout;
