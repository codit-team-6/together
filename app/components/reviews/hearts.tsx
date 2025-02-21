/* eslint-disable react/no-array-index-key */

import {ReviewScoreprops} from '../../types/reviews/reviewScore.types';

import {HeartSVG} from './heartSvg';

export function Hearts({score, isAverage}: ReviewScoreprops) {
  const fullHearts = Math.floor(score); // 정수 부분
  const decimalPercentage = Math.floor((score % 1) * 100);

  const heartPercentageArray: number[] = Array(5).fill(0);

  if (fullHearts > 0) {
    heartPercentageArray.fill(100, 0, fullHearts + 1);

    if (fullHearts < 5) {
      heartPercentageArray[fullHearts] = decimalPercentage;
    }
  }
  return (
    <div className={`flex gap-[2px] ${isAverage && 'gap-2'}`}>
      {heartPercentageArray.map((percentage, index) => (
        <HeartSVG key={`score-${score}-${index}`} percentage={percentage} />
      ))}
    </div>
  );
}
