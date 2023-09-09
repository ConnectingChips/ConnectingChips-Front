import { GroupInfoType } from "../Type/MissionType";

export const initImage = {
  image_id: 0,
  url: "",
  path: "",
};

export const initGroup: GroupInfoType = {
  group_id: 0,
  tab: "",
  title: "",
  intro: "",
  rule: "",
  memberList: [{ member_id: "", day: 0, count: 0, done: false }],
  posts: [{ post_id: 0, title: "", image: initImage }],
  defaultImage: {
    defaultImage_id: 0,
    main_url: "",
    list_url: "",
    intro_url: "",
    group_url: "",
  },
};
