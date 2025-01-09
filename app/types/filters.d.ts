interface IGatheringsFilter {
  teamId: string;
  // 필터링 조건
  id?: string; // 모임 ID
  type?: (typeof TYPES)[number]; // 모임 종류
  location?: (typeof LOCATIONS)[number]; // 모임 위치 // 모임 위치
  date?: string; // YYYY-MM-DD 형식의 날짜
  createdBy?: number; // 모임 생성자 ID
  // 정렬 및 페이징
  sortBy?: (typeof SORT_BY)[number]; // 정렬 기준
  sortOrder?: 'asc' | 'desc'; // 정렬 순서
  limit?: number; // 한 번에 조회할 모임 수
  offset?: number; // 조회 시작 위치
}

interface IJoinedGatheringsFilter {
  completed?: boolean;
  reviewed?: boolean;
  limit?: number;
  offset?: number;
  sortBy?: (typeof SORT_BY)[number];
  sortOrder?: 'asc' | 'desc';
}

interface IGetReviewsFilter {
  gatheringId?: number;
  userId?: number;
  type?: (typeof TYPES)[number];
  location?: (typeof LOCATIONS)[number];
  date?: string;
  registrationEnd?: string;
  sortBy?: (typeof SORT_BY)[number];
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}
