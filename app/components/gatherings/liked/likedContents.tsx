import {useEffect, useState} from 'react';

import {useInfiniteLikedGatherings} from '../../../hooks/useInfiniteGatherings';
import {useInfiniteObserver} from '../../../hooks/useInfiniteObserver';
import {useQueryStringFilter} from '../../../hooks/useQueryStringFilter';
import {Gathering} from '../../../types/gatherings/gatheringOptions.types';
import {GetGatherings} from '../../../types/gatherings/getGatherings.types';
import {EmptyMessage} from '../../common/emptyMessage';
import {PageInfo} from '../../common/pageInfo';
import {TextRender} from '../../common/textRender';
import {GatheringFilter} from '../gatheringFilter/gatheringFilter';
import {ListCard} from '../list/listCard';

export function LikedContents({initialData}: {initialData: GetGatherings[]}) {
  const {filter, setFilter, updateQueryString} = useQueryStringFilter();
  const [storedIds, setStoredIds] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem('likedGatherings');
    if (stored) {
      setStoredIds(JSON.parse(stored));
    }
  }, []);

  const gatheringType = filter.type as Gathering;

  const {data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading, isError} =
    useInfiniteLikedGatherings(initialData, gatheringType, storedIds);

  const observerRef = useInfiniteObserver(() => {
    if (hasNextPage) {
      fetchNextPage();
    }
  });

  return (
    <div>
      <div className="mb-6 tablet:mb-8">
        <PageInfo pageName="liked" />
      </div>
      <div className="border-b-2 border-b-gray-200 pb-4">
        <GatheringFilter
          updateQueryString={updateQueryString}
          filter={filter}
          setFilter={setFilter}
        />
      </div>

      <div>
        {isLoading && <TextRender effect="bounce" text="로딩중..." />}
        {isError && <TextRender effect="shake" text="찜한 목록을 불러오지 못했습니다." />}

        {!isLoading && !isError && (
          <div className="mt-4 flex flex-col items-center justify-between gap-6 tablet:mt-6">
            {data?.pages.flat().length > 0 ? (
              data.pages.flat().map(gathering => <ListCard key={gathering.id} {...gathering} />)
            ) : (
              <EmptyMessage message="찜한 모임이 없어요." />
            )}
          </div>
        )}

        {isFetchingNextPage && (
          <TextRender effect="bounce" text="찜한 모임을 불러오는 중입니다..." />
        )}

        {!hasNextPage && data?.pages.flat().length > 0 && (
          <TextRender
            effect="shake"
            text={`모든 찜한 모임을 불러왔습니다. (${data.pages.flat().length}개)`}
          />
        )}

        <div ref={observerRef} />
      </div>
    </div>
  );
}
