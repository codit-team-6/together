export type AverageScore = {
  teamId: string;
  type: string;
  oneStar: number;
  twoStars: number;
  threeStars: number;
  fourStars: number;
  fiveStars: number;
  averageScore: number;
};

export type OptionalAverageScore = Partial<AverageScore>;

export type AverageScoreList = AverageScore[]; // 배열로 정의
