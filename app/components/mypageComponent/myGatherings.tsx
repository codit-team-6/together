import {useMyGatheringsData} from '../../hooks/useMyGatherings';
import {useMyGatheringsFilter} from '../../hooks/useMyGatheringsFilter';
import {ReviewedGatheringFilter} from '../../types/common/gatheringFilter.types';
import {getCommentByTab} from '../../utils/getCommentByTab';
import {TextRender} from '../common/textRender';

import {EmptyMessage} from './myGatherings/emptyMessage';
import {GatheringList} from './myGatherings/gatheringList';
import {ReviewList} from './myGatherings/reviewList';

export function MyGatherings({
  activeTab,
  reviewed,
}: {
  activeTab: ReviewedGatheringFilter;
  reviewed: boolean;
}) {
  const {joinedGatherings, reviewsData, isLoading, isError, userInfo} = useMyGatheringsData();
  const filteredGatherings = useMyGatheringsFilter(joinedGatherings, activeTab, userInfo?.id);

  if (isLoading) {
    return <TextRender effect="bounce" text="로딩중..." />;
  }

  if (isError) {
    return <TextRender effect="shake" text="데이터를 불러오는 데 실패했습니다." />;
  }

  if (activeTab === 'myReviews' && reviewed) {
    return reviewsData && reviewsData.length > 0 ? (
      <ReviewList reviewsData={reviewsData} />
    ) : (
      <EmptyMessage message="리뷰가 없어요." />
    );
  }

  return filteredGatherings.length > 0 ? (
    <GatheringList gatherings={filteredGatherings} isMyGathering={activeTab === 'myGatherings'} />
  ) : (
    <EmptyMessage message={`${getCommentByTab(activeTab)}모임이 없어요.`} />
  );
}
