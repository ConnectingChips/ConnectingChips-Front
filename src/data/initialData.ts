import { GetUser } from '../Type/User';
import { Mylist } from '../Type/Mind';
import { atom } from 'recoil';

export const initMyList: Mylist[] = [];

export const initUser: GetUser = {
  userId: 0,
  nickname: '',
  profileImage: `${process.env.PUBLIC_URL}/Chips_signout.png`,
  roles: '',
};

export const refreshState = atom({
  key: 'refreshPage',
  default: 0,
});
