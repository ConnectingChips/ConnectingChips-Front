import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { MissonTab } from "../../Component/Mission/MissionTab";
import { GroupInfoType } from "../../Type/MissionType";
import groupListData from "../../data/groupListData";
import { myGroupList } from "../../data/myInfo";
import { useEffect, useState } from "react";
import missionTab from "../../data/missionTab";
import { initGroup } from "../../data/initialData";

/** 23-08-20 GroupList.tsx - 메인 컴프 */
const GroupList = (): JSX.Element => {
  const access_token = localStorage.getItem("access_token");
  const [newGroup, setNewGroup] = useState([initGroup]);

  const myGroupIds = myGroupList.map((group) => group.group_id);

  const [curFocused, setCurFocused] = useState(missionTab[0].title);
  const curFocusBind = { curFocused, setCurFocused };

  useEffect(() => {
    const setGroup =
      curFocused === "전체"
        ? access_token !== null
          ? groupListData.filter((group) => myGroupIds.find((myGroupID) => myGroupID === group.group_id) === undefined)
          : groupListData
        : access_token !== null
        ? groupListData.filter((group) => {
            const focusValid = group.tab === curFocused;
            const mygroupIndex = myGroupIds.findIndex((groupId) => groupId === group.group_id);

            return focusValid && mygroupIndex;
          })
        : groupListData.filter((group) => group.tab === curFocused);

    setNewGroup(setGroup);
  }, [curFocused, access_token]);

  return (
    <article>
      <h2>작심 그룹 리스트</h2>
      <MissonTab missionTab={missionTab} focusbind={curFocusBind} />
      <GroupListListS>
        {newGroup.map((groupInfo) => (
          <GroupListItem groupInfo={groupInfo} key={groupInfo.group_id} />
        ))}
      </GroupListListS>
    </article>
  );
};

export default GroupList;

/** 2023-08-20 GroupList.tsx - 작심 그룹 항목 */
const GroupListItem = ({ groupInfo }: { groupInfo: GroupInfoType }): JSX.Element => {
  const isFirst = groupInfo.memberList.length === 0;
  const groupID = groupInfo.group_id;
  const imageUrl = groupInfo.defaultImage.list_url;
  if (imageUrl === undefined) return <></>;

  return (
    <GroupListItemS key={groupID} img={imageUrl}>
      <div>
        <h2>{groupInfo.title}</h2>
        {isFirst ? <p>작심의 첫 주인공이 되어보세요!</p> : <p>{groupInfo.memberList.length}명 참여중</p>}
      </div>
      <Link to={`/groupIntro/${groupID}`}>
        <button>참여하기</button>
      </Link>
    </GroupListItemS>
  );
};

const GroupListListS = styled.ul`
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;
  gap: var(--height-gap);
`;

const GroupListItemS = styled.li<{ img: string }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;

  border: 1px solid;
  border-radius: 1.25rem;

  background-image: url(${(props) => props.img});

  color: white;

  h2 {
    font-size: 1rem;
    margin-bottom: var(--height-gap);
  }

  button {
    padding: 0.5rem;
    border: 0.15rem solid;
    border-radius: 2rem;

    font-size: 0.8125rem;
    color: white;

    &:hover {
      background-color: black;
      color: white;
      border: 0.15rem solid black;
    }
  }
`;
