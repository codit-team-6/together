export const LOCATION_LIST = ['지역 전체', '건대입구', '을지로3가', '신림', '홍대입구'] as const;
export type Location = (typeof LOCATION_LIST)[number];

export const REVIEW_SORT_LIST = ['최신 순', '리뷰 높은 순', '참여 인원 순'] as const;
export type SortReview = (typeof REVIEW_SORT_LIST)[number];

export const GATHERING_SORT_LIST = ['마감 임박', '참여 인원 순'] as const;
export type SortGathering = (typeof GATHERING_SORT_LIST)[number];

export type DefaultValue = '지역 전체' | '최신 순' | '마감 임박';

export type SelectedItem = Location | SortReview | SortGathering;

export type FilterListType = {
  location?: string;
  sortBy?: string;
  sortOrder?: string;
};
