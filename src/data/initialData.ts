import { GroupInfoType } from '../Type/MissionType';
import { MyList, TotalMind } from '../Type/ListType';

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
  memberList: [{ member_id: '', day: 0, count: 0, done: false }],
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

export const initMyList: MyList = {
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
