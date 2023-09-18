import { GroupInfoType } from '../Type/MissionType';
import { MyListDummy, TotalMind } from '../Type/ListType';
import { GetUser } from '../API/userService';
import { MyInfoType } from '../Type/User';
import 기본프로필 from '../../image/예시사진모음/default_profile_W.png';

export const initImage = {
  image_id: 0,
  url: '',
  path: '',
};

export const initGroup: GroupInfoType = {
  group_id: 0,
  tab: '',
  title: '',
  intro: '',
  rule: '',
  memberList: [{ member_id: 0, day: 0, count: 0, done: false }],
  posts: [{ post_id: 0, title: '', image: initImage }],
  defaultImage: {
    defaultImage_id: 0,
    main_url: '',
    list_url: '',
    intro_url: '',
    group_url: '',
  },
};

export const initTotalList: TotalMind = {
  status: 200,
  data: [
    {
      id: 0,
      type: '',
      name: '',
      introduce: '',
      userCount: 0,
      writeFormat: '',
      canJoin: 0,
      backgroundImage: '',
    },
  ],
};

export const initMyList: MyListDummy = {
  status: 200,
  data: [
    {
      id: 0,
      type: '',
      name: 'defaultName',
      count: 0,
      boardCount: 0,
      image: '',
      isDoneToday: false,
    },
  ],
};

export const userInit: GetUser = {
  userId: 0,
  nickname: '',
  profileImage: '',
  // roles: '',
};

// export const userInitDummy: MyInfoType = {
//   my_id: '',
//   password: '',
//   profileimg: 기본프로필,
// };