import { MyInfoType } from '../Type/User';
import { GetUser } from '../API/userService';
import { GroupInfoType } from '../Type/MissionType';
import groupListData from '../data/groupListData';
import 기본프로필 from '../image/예시사진모음/default_profile_W.png';

const myInfo: GetUser = {
  userId: 0,
  nickname: 'aa11',
  profileImage: 기본프로필,
};

// const myInfo: MyInfoType = {
//   my_id: "aa11",
//   password: "aaaaaaa777",
//   profileimg: "",
// };

const myGroupList: GroupInfoType[] = groupListData.filter((group) =>
  group.memberList.some((member) => member.member_id === myInfo.userId),
);
const myGroupIds = myGroupList.map((group) => group.group_id);
const myGroupImages = myGroupList.map((group) => group.defaultImage.main_url);

export { myInfo, myGroupList, myGroupIds, myGroupImages };

// FIXME: 갈아끼우기 위해 채워넣는 코드
// const blank = '';
// export default blank;
