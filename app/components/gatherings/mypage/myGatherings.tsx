import {useInfiniteObserver} from '../../../hooks/useInfiniteObserver';
import {useMyGatheringsData} from '../../../hooks/useMyGatherings';
import {ReviewedGatheringFilter} from '../../../types/gatherings/gatheringOptions.types';
import {getCommentByTab} from '../../../utils/getCommentByTab';
import {myGatheringFilter} from '../../../utils/myGatheringFilter';
import {EmptyMessage} from '../../common/emptyMessage';
import {TextRender} from '../../common/textRender';
import ReviewListWrapper from '../../reviews/reviewCardList';

import {JoinedGatheringList} from './myGatherings/joinedGatheringList';

export function MyGatherings({
  activeTab,
  reviewed,
}: {
  activeTab: ReviewedGatheringFilter;
  reviewed: boolean;
}) {
  const {
    joinedGatherings,
    hasNextJoinedPage,
    isFetchingNextJoinedPage,
    fetchNextJoinedPage,
    reviewedGatherings,
    hasNextReviewPage,
    isFetchingNextReviewPage,
    fetchNextReviewPage,
    isLoading,
    isError,
    userInfo,
  } = useMyGatheringsData();

  const joinedObserverRef =
    activeTab === 'myGatherings' || activeTab === 'createdGatherings'
      ? useInfiniteObserver(fetchNextJoinedPage)
      : null;
  const reviewObserverRef =
    activeTab === 'myReviews' ? useInfiniteObserver(fetchNextReviewPage) : null;

  const filteredGatherings = myGatheringFilter(joinedGatherings ?? [], activeTab, userInfo?.id);

  if (isLoading) {
    return <TextRender effect="bounce" text="로딩중..." />;
  }

  if (isError) {
    return <TextRender effect="shake" text="데이터를 불러오는 데 실패했습니다." />;
  }

  if (activeTab === 'myReviews' && reviewed) {
    return reviewedGatherings.length > 0 ? (
      <div className="sm:w-full">
        <ReviewListWrapper
          data={reviewedGatherings}
          totalItemCount={reviewedGatherings.length}
          currentPage={1}
          totalPages={1}
        />

        {isFetchingNextReviewPage && (
          <TextRender effect="bounce" text="리뷰를 불러오는 중입니다..." />
        )}

        {!hasNextReviewPage && (
          <TextRender
            effect="shake"
            text={`모든 리뷰를 불러왔습니다. (${reviewedGatherings.length}개)`}
          />
        )}

        <div ref={reviewObserverRef} />
      </div>
    ) : (
      <EmptyMessage message="리뷰가 없어요." />
    );
  }

  return (
    <>
      {filteredGatherings.length > 0 ? (
        <JoinedGatheringList
          gatherings={filteredGatherings}
          isMyGathering={activeTab === 'myGatherings'}
        />
      ) : (
        <EmptyMessage message={`${getCommentByTab(activeTab)} 모임이 없어요.`} />
      )}

      {isFetchingNextJoinedPage && (
        <TextRender effect="bounce" text="모임을 불러오는 중입니다..." />
      )}

      {!hasNextJoinedPage && filteredGatherings.length > 0 && (
        <TextRender
          effect="shake"
          text={`모든 모임을 불러왔습니다. (${filteredGatherings.length}개)`}
        />
      )}

      <div ref={joinedObserverRef} />
    </>
  );
}
