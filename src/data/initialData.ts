import { GetUser } from '../Type/User';
import { Mylist } from '../Type/Mind';
import { atom } from 'recoil';

export const initUser: GetUser = {
  userId: 0,
  nickname: '',
  profileImage: `${process.env.PUBLIC_URL}/Chips_signout.png`,
  roles: '',
};

export const userDataState = atom({
  key: 'userData',
  default: initUser,
});

export const initMyList: Mylist[] = [];

export const myListState = atom({
  key: 'myList',
  default: initMyList,
});

export const refreshState = atom({
  key: 'refreshPage',
  default: 0,
});

export const isCommentInputFocused = atom({
  key: 'isCommentInputFocused',
  default: false,
});
