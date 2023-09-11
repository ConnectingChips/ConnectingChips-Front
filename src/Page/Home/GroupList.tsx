import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import { MissonTab } from '../../Component/Mission/MissionTab';
import { useEffect, useState } from 'react';
import missionTab from '../../data/missionTab';

// TODO: 갈아끼울 코드
import { initTotalList, initMyList, fetchTotalList, fetchMyList } from './HomeBarrel';
import { TotalMindData } from '../../Type/ListType';

// FIXME: 갈아끼울 코드
import { initGroup } from '../../data/initialData';
import { GroupInfoType } from '../../Type/MissionType';
import groupListData from '../../data/groupListData';
import { myGroupIds } from '../../data/myInfo';

/** 23-08-20 GroupList.tsx - 메인 컴프 */
const GroupList = (): JSX.Element => {
  const access_token = localStorage.getItem('access_token');

  // TODO: 갈아끼울 코드
  // const [newGroup, setNewGroup] = useState(initTotalList.data);

  // FIXME: 버려질 코드
  const [newGroup, setNewGroup] = useState([initGroup]);

  // TODO: 갈아끼울 코드
  // const [totalList, setTotalList] = useState(initTotalList.data);
  // const [myList, setMyList] = useState(initMyList.data);
  // useEffect(() => {
  //   fetchTotalList(setTotalList);
  //   fetchMyList(setMyList);
  // }, []);

  // TODO: 갈아끼울 코드
  // const myGroupIds = myList.map((mind) => mind.id);

  const [curFocused, setCurFocused] = useState(missionTab[0].title);
  const curFocusBind = { curFocused, setCurFocused };

  useEffect(() => {
    const setGroup =
      curFocused === '전체'
        ? access_token !== null
          ? // TODO: 갈아끼울 코드
            // ? totalList.filter(
            //     (group) => myGroupIds.find((myGroupID) => myGroupID === group.id) === undefined,
            //   )

            // FIXME: 버려질 코드
            groupListData.filter(
              (group) => myGroupIds.find((myGroupID) => myGroupID === group.group_id) === undefined,
            )
          : // TODO: 갈아끼울 코드
            // : totalList

            // FIXME: 버려질 코드
            groupListData
        : // ? // TODO: 갈아끼울 코드
          // ? totalList.filter((group) => {
          //     const focusValid = group.type === curFocused;
          //     const mygroupIndex = myGroupIds.findIndex((groupId) => groupId === group.id);

          //     return focusValid && mygroupIndex;
          //   })
          // : totalList.filter((group) => group.type === curFocused);

          // FIXME: 버려질 코드
          groupListData.filter((group) => {
            const focusValid = group.tab === curFocused;
            const mygroupIndex = myGroupIds.findIndex((groupId) => groupId === group.group_id);

            return focusValid && mygroupIndex;
          });
    //       : groupListData.filter((group) => group.tab === curFocused);

    setNewGroup(setGroup);
    //   // TODO: 갈아끼울 코드
    //   // }, [curFocused, access_token, myGroupIds, totalList]);

    //   // FIXME: 버려질 코드
  }, [curFocused, access_token]);

  return (
    <article>
      <h2>작심 그룹 리스트</h2>
      <MissonTab missionTab={missionTab} focusbind={curFocusBind} />
      <GroupListListS>
        {newGroup.map((groupInfo) => (
          // TODO: 갈아끼울 코드
          // <GroupListItem groupInfo={groupInfo} key={groupInfo.id} />

          // FIXME: 버려질 코드
          <GroupListItem groupInfo={groupInfo} key={groupInfo.group_id} />
        ))}
      </GroupListListS>
    </article>
  );
};

export default GroupList;

/** 2023-08-20 GroupList.tsx - 작심 그룹 항목 */
// TODO: 갈아끼울 코드
// const GroupListItem = ({ groupInfo }: { groupInfo: TotalMindData }): JSX.Element => {
//   const userCount = groupInfo.userCount;
//   // // TODO: 이미지 종류 4가지
//   const imageUrl = groupInfo.backgroundImage;

//   return (
//     <GroupListItemS key={groupInfo.id} img={imageUrl}>
//       <div>
//         <h2>{groupInfo.name}</h2>
//         {userCount === 0 ? <p>작심의 첫 주인공이 되어보세요!</p> : <p>{userCount}명 참여중</p>}
//       </div>
//       <Link to={`/groupIntro/${groupInfo.id}`}>
//         <button>참여하기</button>
//       </Link>
//     </GroupListItemS>
//   );
// };

// FIXME: 버려질 코드
const GroupListItem = ({ groupInfo }: { groupInfo: GroupInfoType }): JSX.Element => {
  // TODO: 갈아끼울 코드
  // const userCount = groupInfo.userCount;
  // // TODO: 이미지 종류 4가지
  // const imageUrl = groupInfo.backgroundImage;

  // FIXME: 버려질 코드
  const isFirst = groupInfo.memberList.length === 0;
  const groupID = groupInfo.group_id;
  const imageUrl = groupInfo.defaultImage.list_url;
  if (imageUrl === undefined) return <></>;

  return (
    <GroupListItemS key={groupID} img={imageUrl}>
      <div>
        <h2>{groupInfo.title}</h2>
        {isFirst ? (
          <p>작심의 첫 주인공이 되어보세요!</p>
        ) : (
          <p>{groupInfo.memberList.length}명 참여중</p>
        )}
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
