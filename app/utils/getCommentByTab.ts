import {ReviewedGatheringFilter} from '../types/gatherings/gatheringOptions.types';

/**
 * 탭 상태(activeTab)에 따라 적절한 주석(설명 텍스트)을 반환하는 함수
 *
 * @param activeTab - 현재 활성화된 탭 상태 (유형: ReviewedGatheringFilter)
 *   - 'myGatherings': 내가 신청한 모임
 *   - 'myReviews': 내가 리뷰를 작성할 수 있는 모임
 *   - 'createdGatherings': 내가 만든 모임
 * @returns string - 해당 탭에 맞는 설명 텍스트
 *   - 'myGatherings' → '신청한 '
 *   - 'myReviews' → '리뷰 작성 가능한 '
 *   - 'createdGatherings' → '아직 만든 '
 */
const tabComments: Record<ReviewedGatheringFilter, string> = {
  myGatherings: '신청한 ',
  myReviews: '리뷰 작성 가능한 ',
  createdGatherings: '내가 만든 ',
};

export function getCommentByTab(activeTab: ReviewedGatheringFilter): string {
  return tabComments[activeTab];
}
