/**
 * 모임이 마감되었는지 확인하는 유틸리티 함수
 *
 * @param registrationEnd - 모임 신청 마감 시간 (ISO 형식의 문자열, 예: '2025-01-01T10:00:00Z')
 * @param participantCount - 현재 참가자 수
 * @param capacity - 최대 참가 가능 인원
 * @returns boolean - 모임이 마감되었으면 `true`, 그렇지 않으면 `false`
 *   - 참가자가 정원을 초과한 경우 `true` 반환
 *   - 현재 시간이 신청 마감 시간을 초과한 경우 `true` 반환
 */
export function isClosed(
  registrationEnd: string,
  participantCount: number,
  capacity: number,
): boolean {
  const closeTime = new Date(registrationEnd).toISOString().split('.')[0];
  const getNow = new Date().toISOString().split('.')[0];

  if (participantCount >= capacity) {
    return true;
  }

  return getNow >= closeTime;
}
