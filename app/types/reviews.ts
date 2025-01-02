export interface IReviews {
  data: {
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
  }[];
  totalItemCount: number;
  currentPage: number;
  totalPages: number;
}
