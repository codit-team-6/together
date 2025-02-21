import {AverageScore} from '../../types/reviews/averageScores.types';

import {Hearts} from './hearts';

/* eslint-disable react/no-array-index-key */

export function AverageScores({
  oneStar,
  twoStars,
  threeStars,
  fourStars,
  fiveStars,
  averageScore,
}: AverageScore) {
  const scoreArray: number[] = [fiveStars, fourStars, threeStars, twoStars, oneStar];

  const sum = scoreArray.reduce((acc, num) => acc + num, 0);

  const ratio: string[] = scoreArray.map(item => `${Math.floor((item / sum) * 100)}%`);
  let averageScoreFormat = '';
  if (averageScore % 1 > 0) {
    averageScoreFormat = `${Math.trunc(averageScore * 10) / 10}`;
  } else {
    averageScoreFormat = `${averageScore}.0`;
  }

  return (
    <div className="flex h-[180px] w-full items-center justify-between border-y-2 border-y-gray-200 bg-white px-6 py-8 sm:px-[73px]">
      <div className="flex w-32 flex-col items-center gap-2">
        <div>
          <span className="text-xl font-semibold text-gray-900 tablet:text-2xl">
            {averageScoreFormat}
          </span>
          <span className="text-xl font-semibold text-gray-400 tablet:text-2xl">/5</span>
        </div>
        <div>
          <Hearts score={Number(averageScoreFormat)} isAverage />
        </div>
      </div>
      <div>
        <div className="flex w-[150px] flex-col gap-1 sm:w-[302px]">
          {scoreArray.map((score, index) => (
            <div key={`${score}-${index}`} className="flex items-center gap-3">
              <span className="whitespace-nowrap text-sm text-gray-700">
                {scoreArray.length - index}점
              </span>
              <div className="relative h-1 w-[84px] rounded-sm bg-gray-200 sm:w-60">
                <div
                  className="absolute h-1 rounded-sm bg-gray-900 tablet:w-60"
                  style={{width: Number(averageScoreFormat) === 0 ? '0%' : ratio[index]}}
                />
              </div>
              <span className="text-sm text-gray-400">{score}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
