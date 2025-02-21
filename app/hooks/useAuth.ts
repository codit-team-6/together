'use client';

import {useCallback} from 'react';

import {useQueryClient} from '@tanstack/react-query';
import {useRouter} from 'next/navigation';

import {deleteCookie} from '../apis/userApi';
import {userQueryKey} from '../queries/common/queryKeys';

// Todo: 실패 시 에러 핸들링 제대로 적용하기
export const useClearAuth = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const clearAuth = useCallback(async () => {
    // 1. Cookie 삭제
    await deleteCookie();

    // 2. 로그인 페이지로 리다이렉트
    router.push('/login');

    queryClient.setQueryData(userQueryKey.myInfo(), null);
  }, [router]);

  return {clearAuth};
};
