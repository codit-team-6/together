'use client';

import {useCallback, useMemo} from 'react';

import {useInfiniteGatherings} from '../../../hooks/useInfiniteGatherings';
import {useInfiniteObserver} from '../../../hooks/useInfiniteObserver';
import {useQueryStringFilter} from '../../../hooks/useQueryStringFilter';
import {GatheringsFilter} from '../../../types/common/filters.types';
import {GetGatherings} from '../../../types/gatherings/getGatherings.types';
import {Filtering} from '../../common/filter/filtering';
import {CreateGatheringButton} from '../createGatheringModal/createGatheringButton';
import {GatheringFilter} from '../gatheringFilter/gatheringFilter';

import {ListCard} from './listCard';

export default function GatheringsList({initialData}: {initialData: GetGatherings[]}) {
  const {filter, setFilter, updateQueryString} = useQueryStringFilter();
  const {data, fetchNextPage, hasNextPage, isFetchingNextPage} = useInfiniteGatherings(
    initialData,
    filter as GatheringsFilter,
  );

  const handleFetchNextPage = useCallback(() => {
    if (hasNextPage) fetchNextPage();
  }, [hasNextPage, fetchNextPage]);

  const observerRef = useInfiniteObserver(handleFetchNextPage);

  const gatherings = useMemo(() => {
    if (!data) return [];
    const uniqueGatherings = new Map<number, GetGatherings>();
    data.pages.flat().forEach(gathering => {
      uniqueGatherings.set(gathering.id, gathering);
    });
    return Array.from(uniqueGatherings.values());
  }, [data]);

  return (
    <>
      {/* 필터링 */}
      <div className="relative border-b-2 border-b-gray-200 pb-4">
        <GatheringFilter
          updateQueryString={updateQueryString}
          filter={filter}
          setFilter={setFilter}
        />
        <CreateGatheringButton />
      </div>
      <div className="mb-4 mt-3 tablet:mb-6 tablet:mt-4">
        <Filtering
          pageName="GATHERING"
          updateQueryString={updateQueryString}
          filter={filter}
          setFilter={setFilter}
        />
      </div>
      <div className="flex flex-col items-center gap-6">
        {gatherings.map(gathering => (
          <ListCard key={gathering.id} {...gathering} />
        ))}

        {!hasNextPage && gatherings.length > 0 && (
          <div className="mt-4 border-t border-gray-200 py-4 text-center text-gray-500">
            <p>모든 모임을 불러왔습니다. ({gatherings.length}개)</p>
          </div>
        )}

        {isFetchingNextPage && (
          <div className="py-4 text-center text-gray-500">
            <div className="mx-auto size-8 animate-spin rounded-full border-b-2 border-gray-900" />
            <p className="mt-2">모임을 불러오는 중입니다...</p>
          </div>
        )}

        <div ref={observerRef} className="h-2 w-full" />
      </div>
    </>
  );
}
