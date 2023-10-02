import { GetUser } from '../Type/User';
import { Mylist } from '../Type/Mind';

export const initMyList: Mylist[] = [];

export const initUser: GetUser = {
  userId: 0,
  nickname: '',
  profileImage: `${process.env.PUBLIC_URL}/Chips_signout.png`,
  roles: '',
};
