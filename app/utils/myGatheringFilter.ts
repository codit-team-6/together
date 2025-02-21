import {ReviewedGatheringFilter} from '../types/gatherings/gatheringOptions.types';
import {GetJoinedGatherings} from '../types/gatherings/joinedGatherings.types';

/**
 * 현재 활성화된 탭(activeTab)에 따라 모임 목록(joinedGatherings)을 필터링합니다
 *
 * - 나의 모임(myGatherings)탭: 전체 모임중 내가 참여중인 모임을 보여줌
 * - 나의 리뷰(myReviews)탭: 완료된 모임(isCompleted) 중 리뷰가 작성되지 않은 모임(isReviewed === false)을 보여줌
 *   취소된 모임은 제외
 * - 내가 만든 모임(createdGatherings)탭: 조건(취소, 마감) 상관 없이 사용자가 만든 모든 모임을 보여줌
 *   모임을 만든 사람은 모임에 자동 참여하므로 joinedGathering에서 데이터 사용 -> createdBy로 필터링
 *
 * 필터링된 모임 리스트를 반환합니다. 참여한 모임이 없거나 리스트가 비어 있다면 빈 배열([])을 반환합니다.
 */
export function myGatheringFilter(
  joinedGatherings: GetJoinedGatherings[] | null,
  activeTab: ReviewedGatheringFilter,
  userId?: number,
) {
  if (!joinedGatherings || joinedGatherings.length === 0) return [];

  switch (activeTab) {
    case 'myGatherings':
      return joinedGatherings;
    case 'myReviews':
      return joinedGatherings.filter(
        gathering => gathering.isCompleted && !gathering.isReviewed && !gathering.canceledAt,
      );
    case 'createdGatherings':
      return joinedGatherings.filter(gathering => gathering.createdBy === userId);
    default:
      return [];
  }
}
