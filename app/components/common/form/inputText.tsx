/**
 * InputTextBox 컴포넌트
 *
 * - 사용자가 입력할 수 있는 `textarea`를 렌더링
 * - Props:
 *   - placeholder, value, onChange를 props로 받아옴
 *   - height: 텍스트 박스의 높이 (px 단위)
 *
 * ## 참고 사항
 * - 가로 너비(`width`): 고정값 `w-full`을 사용
 *   - 별도의 가로 조정이 필요한 경우 부모 컨테이너에서 스타일 조정 필요
 * - 세로 크기(`height`): Props로 전달받아 동적으로 설정
 * - 텍스트 박스는 `resize: none`으로 크기 조정 비활성화
 */
export function InputTextBox({
  placeholder,
  value,
  onChange,
  height,
}: {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  height: number;
}) {
  return (
    <textarea
      className={`mt-[12px] h-[${height}px] w-full resize-none overflow-auto rounded-md bg-gray-50 p-[10px] text-sm font-medium`}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
}
