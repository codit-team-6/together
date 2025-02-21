export type ReviewListDataType = {
  teamId: number;
  id: number;
  score: number;
  comment: string;
  createdAt: string;
  Gathering: {
    teamId: number;
    id: number;
    type: string;
    name: string;
    dateTime: string;
    location: string;
    image: string;
  };
  User: {
    teamId: number;
    id: number;
    name: string;
    image: string;
  };
};
export type ReviewListType = {
  data: ReviewListDataType[];
  totalItemCount: number;
  currentPage: number;
  totalPages: number;
};

export type ReviewParams = {
  gatheringId?: number;
  userId?: number;
  type?: string;
  location?: string;
  date?: string;
  registrationEnd?: string;
  sortBy?: string;
  sortOrder?: string;
  limit: number;
  offset: number;
};

export type ReviewType = {
  gatheringImg: string;
  score: number;
  comment: string;
  gatheringType: string;
  gatheringLocation: string;
  userImg: string;
  userName: string;
  createdAt: string;
  pageName: PageName;
};

export type PageName = 'reviews' | 'mypage' | 'gatherings';
