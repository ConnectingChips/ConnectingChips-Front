export interface User {
  accountId: string;
  password: string;
  email: string;
  nickname: string;
}

export interface GetUser {
  userId: number;
  nickname: string;
  profileImage: string;
  roles: string;
}