'use client';

import {useInfiniteQuery} from '@tanstack/react-query';

import {useInfiniteObserver} from '../../hooks/useInfiniteObserver';
import {useQueryStringFilter} from '../../hooks/useQueryStringFilter';
import {reviewListQuery} from '../../queries/common/queryKeys';
import {ReviewListType} from '../../types/reviews/reviews.types';
import {Filtering} from '../common/filter/filtering';
import {GatheringFilter} from '../gatherings/gatheringFilter/gatheringFilter';

import AverageScoresWrapper from './AverageScoresWrapper';
import ReviewListWrapper from './reviewCardList';

type ReviewWrapperProps = {
  initialData: ReviewListType;
};

export default function ReviewWrapper({initialData}: ReviewWrapperProps) {
  const {filter, setFilter, updateQueryString} = useQueryStringFilter();

  const {data, fetchNextPage, hasNextPage} = useInfiniteQuery({
    queryKey: ['reviewList', filter],
    queryFn: async ({pageParam = 0}) => {
      const {queryFn} = reviewListQuery.getReviewList({
        ...filter,
        offset: pageParam,
        limit: 10,
      });
      return queryFn();
    },
    initialPageParam: 0,
    getNextPageParam: lastPage => {
      return lastPage.data.length < 10 ? undefined : lastPage.currentPage + 1;
    },
    initialData: {pages: [{...initialData}], pageParams: [0]},
  });

  const observerRef = useInfiniteObserver(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  });

  return (
    <>
      <div className="border-b-2 border-b-gray-200 pb-4">
        <GatheringFilter
          updateQueryString={updateQueryString}
          filter={filter}
          setFilter={setFilter}
        />
      </div>

      <AverageScoresWrapper filter={filter} />
      <div className="mt-4 border-t-2 border-t-gray-900 bg-white px-4 py-6 tablet:mt-6 tablet:px-6">
        <div className="mb-6">
          <Filtering
            pageName="REVIEW"
            updateQueryString={updateQueryString}
            filter={filter}
            setFilter={setFilter}
          />
        </div>

        {data?.pages.map(page => <ReviewListWrapper key={page.currentPage} {...page} />)}
        {hasNextPage && <div ref={observerRef} className="h-10" />}
      </div>
    </>
  );
}
