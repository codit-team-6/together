import {Gathering, Locations, SortBy} from '../gatherings/gatheringOptions.types';

export type GatheringsFilter = {
  // 필터링 조건
  id?: string; // 모임 ID: ,로 구분된 string
  type?: Gathering; // 모임 종류
  location?: Locations; // 모임 위치 // 모임 위치
  date?: string; // YYYY-MM-DD 형식의 날짜
  createdBy?: number; // 모임 생성자 ID
  // 정렬 및 페이징
  sortBy?: SortBy; // 정렬 기준
  sortOrder?: 'asc' | 'desc'; // 정렬 순서
  limit?: number; // 한 번에 조회할 모임 수
  offset?: number; // 조회 시작 위치
};

export type JoinedGatheringsFilter = {
  completed?: boolean;
  reviewed?: boolean;
  limit?: number;
  offset?: number;
  sortBy?: SortBy;
  sortOrder?: 'asc' | 'desc';
};

export type GetReviewsFilter = {
  gatheringId?: number;
  userId?: number;
  type?: Gathering;
  location?: Locations;
  date?: string;
  registrationEnd?: string;
  sortBy?: SortBy;
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
};
