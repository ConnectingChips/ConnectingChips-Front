import { useEffect, useState } from "react";
import { doneBind, countBind, uuidBind } from "../../../Type/MissionType";
import { myGroupList } from "./CarreselBarrel";
import { myInfo } from "./CarreselBarrel";

const useCarresel = (doneBind: doneBind, countBind: countBind, uuidBind: uuidBind) => {
  /** Mylist - 내 작심 삼일 상태 관리 */
  const [dateList, setDateList] = useState([0]);
  const { doneList } = doneBind;
  const { countList } = countBind;
  const { uuidList } = uuidBind;

  useEffect(() => {
    const { doneList, setDoneList } = doneBind;
    const { countList, setCountList } = countBind;
    const { uuidList, setUuidList } = uuidBind;

    myGroupList.map((mygroup, index) => {
      const missionInfo = mygroup.memberList.find((member) => member.member_id === myInfo.my_id);
      if (missionInfo === undefined) return null;

      const makeDateList = dateList;
      makeDateList[index] = missionInfo.day;
      setDateList(makeDateList);

      const makeDoneList = doneList;
      makeDoneList[index] = missionInfo.done;
      setDoneList(makeDoneList);

      const makeCountList = countList;
      makeCountList[index] = missionInfo.count;
      setCountList(makeCountList);

      const makeUuidList = uuidList;
      makeUuidList[index] = mygroup.group_id;
      setUuidList(makeUuidList);
    });
  }, [doneBind, countBind, uuidBind, dateList]);

  return { dateList, doneList, countList, uuidList };
};

export default useCarresel;
