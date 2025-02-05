/**
 * 데이터가 비어 있을 경우 렌더링 되는 텍스트
 *
 * @param message 렌더링 될 메시지
 * @returns 렌더링 되는 JSX.Element
 */
export function EmptyMessage({message}: {message: string}) {
  return (
    <div className="absolute left-1/2 top-[180px] h-[20px] w-[220px] -translate-x-1/2">
      <p className="text-sm font-medium text-gray-500">{message}</p>
    </div>
  );
}
