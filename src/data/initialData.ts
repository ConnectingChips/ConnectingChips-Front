import { GetUser } from '../type/User';
import { Mylist } from '../type/Mind';
import { atom } from 'recoil';

export const initMyList: Mylist[] = [];

export const initUser: GetUser = {
  userId: 0,
  nickname: '',
  profileImage: `${process.env.PUBLIC_URL}/assets/Chips_signout.png`,
  roles: '',
};

export const refreshState = atom({
  key: 'refreshPage',
  default: 0,
});

export const isCommentInputFocused = atom({
  key: 'isCommentInputFocused',
  default: false,
});
