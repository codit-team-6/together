'use client';

import {useEffect, useState} from 'react';

import {useRouter, useSearchParams} from 'next/navigation';

import {GetReviewsProps} from '../types/reviews/reviewsApi.types';
import {checkQueryStringObject} from '../utils/checkQueryStringObject';

export const useQueryStringFilter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [filter, setFilter] = useState<GetReviewsProps>({
    type: 'DALLAEMFIT',
  });

  useEffect(() => {
    const queryEntries = Object.fromEntries(searchParams.entries());

    const newFilter: GetReviewsProps = checkQueryStringObject({
      ...queryEntries,
      type: queryEntries.type || 'DALLAEMFIT', // 기본값 설정
    });

    setFilter(newFilter);
  }, [searchParams]);

  const updateQueryString = (newFilter: Partial<GetReviewsProps>) => {
    const updatedFilter = {...filter, ...newFilter};
    const queryString = new URLSearchParams(
      Object.entries(updatedFilter)
        .filter(([, value]) => value !== undefined && value !== null)
        .reduce(
          (acc, [key, value]) => {
            acc[key] = String(value);
            return acc;
          },
          {} as Record<string, string>,
        ),
    ).toString();
    router.replace(`?${queryString}`);
  };

  const resetFilter = () => {
    setFilter({type: 'DALLAEMFIT'});
    router.replace('/');
  };

  return {filter, setFilter, updateQueryString, resetFilter};
};
