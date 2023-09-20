import { GetUser } from '../Type/User';
import 기본프로필 from '../image/예시사진모음/default_profile_W.png';
import { Mylist, Mind } from '../Type/userMind';

export const initTotalList: Mind[] = [];
export const initMyList: Mylist[] = [];

export const initUser: GetUser = {
  userId: 0,
  nickname: '',
  profileImage: 기본프로필,
  roles: '',
};