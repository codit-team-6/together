/**
 * 날짜 및 시간을 포맷팅하여 연도, 날짜, 시간 문자열로 반환하는 유틸리티 함수
 *
 * @param dateTime - ISO 형식의 날짜 문자열 (예: '2025-01-30T09:00:00Z')
 * @returns 객체 형태의 포맷팅된 날짜 정보
 *   - year: 연도 (예: '2025')
 *   - date: 날짜 (월과 일, 예: '1월 30일')
 *   - time: 시간 (24시간 형식, 예: '09:00')
 */
export default function formatDateUtil(dateTime: string) {
  // 입력 받은 dateTime을 Date 객체로 변환
  const date = new Date(dateTime);

  const year = date.getFullYear();
  // month: 0부터 시작 하므로 +1 해줘야 함
  const month = date.getMonth() + 1;
  const day = date.getDate();
  // hours와 minutes은 2자리로 포맷팅
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return {
    year: `${year}`,
    date: `${month}월 ${day}일`,
    time: `${hours}:${minutes}`,
  };
}
