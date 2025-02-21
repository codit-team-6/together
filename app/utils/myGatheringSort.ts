import {GetJoinedGatherings} from '../types/gatherings/joinedGatherings.types';

/**
 * 정렬 함수: 참여 예정 모임 > 완료된 모임 > 취소된 모임 순으로 정렬
 * - 동일 조건 내에서는 dateTime 기준으로 오름차순 정렬 (api 요청 단계에서 sort)
 *
 * @param data - 정렬할 GetJoinedGatherings 배열
 * @returns 정렬된 GetJoinedGatherings 배열
 */
export function myGatheringSort(data: GetJoinedGatherings[]): GetJoinedGatherings[] {
  return data.sort((a, b) => {
    // 1. 참여 예정 모임 우선 (완료 된 모임을 뒤로 배치)
    if (!a.isCompleted && b.isCompleted) return -1;
    if (a.isCompleted && !b.isCompleted) return 1;

    // 2. 취소된 모임을 가장 마지막으로 배치
    if (a.canceledAt && !b.canceledAt) return 1;
    if (!a.canceledAt && b.canceledAt) return -1;

    // 동일 조건 내에서는 dateTime 기준으로 정렬
    // sort 과정에서 순서가 꼬이는 경우 방지를 위해 처리
    return new Date(a.dateTime).getTime() - new Date(b.dateTime).getTime();
  });
}
