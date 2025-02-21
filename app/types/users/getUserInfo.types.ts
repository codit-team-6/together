export type User = {
  id: number;
  email: string;
  name: string;
  companyName: string;
  image: string;
};

export type GetUserInfo = User & {
  createdAt: string;
  updatedAt: string;
};
