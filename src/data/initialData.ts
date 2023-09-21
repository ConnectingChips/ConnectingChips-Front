import { GetUser } from '../Type/User';
import 기본프로필 from '../image/예시사진모음/default_profile_W.png';
import { MindPageInfo, MindsType, Mylist } from '../Type/Mind';

export const initMyList: Mylist[] = [];

export const initUser: GetUser = {
  userId: 0,
  nickname: '',
  profileImage: 기본프로필,
  roles: '',
};

// export const initMind: MindPageInfo = {
//   mindId: 0,
//   mindTypeName: '',
//   name: '',
//   userCount: 0,
//   writeFormat: '',
//   doneToday: false,
//   count: 0,
// };

export const initMind: MindsType = {
  mindId: 0,
  mindTypeName: '',
  name: '',
  introduce: '',
  userCount: 0,
  pageImage: '',
};
