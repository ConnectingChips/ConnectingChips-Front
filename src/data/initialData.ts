import { GetUser } from '../Type/User';
import { MindsType, Mylist } from '../Type/Mind';

export const initMyList: Mylist[] = [];

export const initUser: GetUser = {
  userId: 0,
  nickname: '',
  profileImage: `${process.env.PUBLIC_URL}/Chips_signout.png`,
  roles: '',
};

export const initMind: MindsType = {
  mindId: 0,
  mindTypeName: '',
  name: '',
  introduce: '',
  userCount: 0,
  writeFormat: '',
  isDoneToday: false,
  count: 0,
  canJoin: 0,
};
