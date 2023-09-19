import { GroupInfoType } from '../Type/MissionType';
import { GetUser } from '../Type/User';
import 기본프로필 from '../image/예시사진모음/default_profile_W.png';
import { Mylist, Mind } from '../Type/userMind';

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

export const initTotalList: Mind[] = [];
export const initMyList: Mylist[] = [];

export const initUser: GetUser = {
  userId: 0,
  nickname: '',
  profileImage: 기본프로필,
  roles: '',
};