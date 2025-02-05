/**
 * 주어진 매개변수를 기반으로 쿼리 문자열을 생성하는 함수
 *
 * @param params - key(string)-value 쌍으로 이루어진 객체
 * @returns 쿼리 문자열 (예: "foo=bar&baz=123&active=true")
 *
 * 처리 과정:
 * 1. Object.entries를 사용해 객체를 [key, value]의 배열로 변환
 * 2. 값이 undefined 또는 null인 항목을 필터링
 * 3. 나머지 [key, value] 쌍을 문자열 값으로 변환
 * 4. URLSearchParams를 사용해 쿼리 문자열 생성
 * 5. 최종적으로 .toString()으로 쿼리 문자열 반환
 */
export default function createQueryString(
  params: Record<string, string | number | boolean | null | undefined>,
) {
  return new URLSearchParams(
    Object.entries(params)
      .filter(([, value]) => value !== undefined && value !== null)
      .reduce((acc, [key, value]) => ({...acc, [key]: String(value)}), {}),
  ).toString();
}
