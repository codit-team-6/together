type TextRenderProps = {
  text: string;
  effect: 'shake' | 'bounce';
};

/**
 * 로딩, 데이터 로딩 실패에 텍스트에 대한 애니메이션 처리
 *  - 성능 저하 방지를 위해 짧은 텍스트에만 사용하도록 제한
 *  - 주어진 애니메이션 이외는 효과 미적용
 *
 * @param effect - 애니메이션 효과 ('shake' 또는 'bounce')
 * @param text - 렌더링할 텍스트
 * @returns JSX.Element
 */
export function TextRender({effect, text}: TextRenderProps) {
  // effect 입력이 없는 경우(혹은 예상치 못한 값 입력)와 제한 길이 보다 긴 텍스트에 대한 기본 처리
  const isEffectValid = effect === 'shake' || effect === 'bounce';
  if (!isEffectValid || text.length > 100) {
    return <div className="pt-10 text-center">{text}</div>;
  }

  if (effect === 'bounce') {
    return (
      <div className="pt-10 text-center">
        {text.split('').map((char, index) => (
          <span
            // eslint-disable-next-line react/no-array-index-key
            key={`${char}-${index}`}
            className="inline-block animate-bounce"
            style={{animationDelay: `${index * 0.2}s`, animationTimingFunction: 'ease-in-out'}}
          >
            {char}
          </span>
        ))}
      </div>
    );
  }

  if (effect === 'shake') {
    return <div className="animate-shake pt-10 text-center">{text}</div>;
  }
}
