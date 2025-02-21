/**
 * 데이터가 비어 있을 경우 렌더링 되는 텍스트
 *
 * @param message 렌더링 될 메시지
 * @returns 렌더링 되는 JSX.Element
 */
export function EmptyMessage({message}: {message: string}) {
  return (
    <div className="mt-[180px] flex h-[20px] w-[full] items-center justify-center">
      <p className="text-sm font-medium text-gray-500">{message}</p>
    </div>
  );
}
