export type GetReviewsProps = {
  gatheringId?: number;
  type?: string;
  location?: string;
  date?: string;
  sortBy?: string;
  sortOrder?: string;
  limit?: number;
  offset?: number;
};

export type GetMyReviewsProps = {
  userId: number;
  sortOrder: string;
  limit?: number;
  offset?: number;
};

export type GetGatheringReviewsProps = {
  gatheringId?: number;
  sortOrder?: string;
  page?: number;
  limit?: number;
  offset?: number;
};
