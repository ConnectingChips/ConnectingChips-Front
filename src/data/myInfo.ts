import { MyInfoType } from "../Type/User";
import { GroupInfoType } from "../Type/MissionType";
import groupListData from "../data/groupListData";

const myInfo: MyInfoType = {
  my_id: "aa11",
  password: "aaaaaaa777",
  profileimg: "",
};

const myGroupList: GroupInfoType[] = groupListData.filter((group) => group.memberList.some((member) => member.member_id === myInfo.my_id));
const myGroupIds = myGroupList.map((group) => group.group_id);
const myGroupImages = myGroupList.map((group) => group.defaultImage.main_url);

export { myInfo, myGroupList, myGroupIds, myGroupImages };
