import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import { MissonTab } from '../../Component/Mission/MissionTab';
import { useEffect, useState } from 'react';
import missionTab from '../../data/missionTab';

// TODO: 갈아끼울 코드
import { TotalMindData } from '../../Type/ListType';

// FIXME: 갈아끼울 코드
import { initGroup } from '../../data/initialData';
import { GroupInfoType } from '../../Type/MissionType';
import groupListData from '../../data/groupListData';
import { myGroupIds } from '../../data/myInfo';
import { Mind, getMindAll } from '../../API/userMind';

const mindInit = [
  {
    id: 0,
    mindType: '',
    name: '',
    introduce: '',
    userCount: 0,
    writeFormat: '',
    canJoin: 0,
    backgroundImage: '',
  },
];

/** 23-08-20 GroupList.tsx - 메인 컴프 */
const GroupList = (): JSX.Element => {
  const access_token = localStorage.getItem('access_token');

  // TODO: 갈아끼울 코드
  // const [newGroup, setNewGroup] = useState(initTotalList.data);
  // const [showList, setShowList] = useState<Mind[]>(mindInit);

  // useEffect(() => {
  //   getMindAll().then((mindList) => setShowList(mindList));
  // }, []);

  // FIXME: 버려질 코드
  const [newGroup, setNewGroup] = useState([initGroup]);


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
    // TODO: 갈아끼울 코드
    // }, [curFocused, access_token, myGroupIds, totalList]);

    // FIXME: 버려질 코드
  }, [curFocused, access_token]);

  return (
    <article>
      <h2>작심 그룹 리스트</h2>
      <MissonTab missionTab={missionTab} focusbind={curFocusBind} />
      <GroupListListS>
        {/* TODO: 갈아끼울 코드 */}
        {/* {showList.map((mind) => (
          <GroupListItem mind={mind} key={mind.id} />
        ))} */}

        {/* FIXME: 버려질 코드 */}
        {newGroup.map((groupInfo) => (
          <GroupListItem groupInfo={groupInfo} key={groupInfo.group_id} />
        ))}
      </GroupListListS>
    </article>
  );
};

export default GroupList;

// TODO: 교체할 코드
// const GroupListItem = ({ mind }: { mind: Mind }): JSX.Element => {
//   return (
//     <Link to={`/groupIntro/${mind.id}`}>
//       <GroupListItemS key={mind.id} img={mind.backgroundImage}>
//         <ItemContent mind={mind} />
//         <button>참여하기</button>
//       </GroupListItemS>
//     </Link>
//   );
// };

// FIXME: 버려질 코드
const GroupListItem = ({ groupInfo }: { groupInfo: GroupInfoType }): JSX.Element => {
  const groupID = groupInfo.group_id;
  const imageUrl = groupInfo.defaultImage.list_url;
  if (imageUrl === undefined) return <></>;

  return (
    <Link to={`/groupIntro/${groupID}`}>
      <GroupListItemS key={groupID} img={imageUrl}>
        <ItemContent groupInfo={groupInfo} />
        <button>참여하기</button>
      </GroupListItemS>
    </Link>
  );
};

// TODO: 교체할 코드
// const ItemContent = ({ mind }: { mind: Mind }): JSX.Element => {
//   const isFirst = mind.userCount === 0;

//   return (
//     <ItemContentS>
//       <div className='Item-Name'>
//         <ItemTabS>{mind.mindType}</ItemTabS>
//         <h2>{mind.name}</h2>
//       </div>
//       {isFirst ? (
//         <p>작심의 첫 주인공이 되어 보세요!</p>
//       ) : (
//         <p>
//           <span className='people'>{mind.userCount}</span>명 함께 맛보기 중
//         </p>
//       )}
//     </ItemContentS>
//   );
// };

// FIXME: 버려질 코드
const ItemContent = ({ groupInfo }: { groupInfo: GroupInfoType }): JSX.Element => {
  const isFirst = groupInfo.memberList.length === 0;

  return (
    <ItemContentS>
      <div className='Item-Name'>
        <ItemTabS>{groupInfo.tab}</ItemTabS>
        <h2>{groupInfo.title}</h2>
      </div>
      {isFirst ? (
        <p>작심의 첫 주인공이 되어 보세요!</p>
      ) : (
        <p>
          <span className='people'>{groupInfo.memberList.length}</span>명 함께 맛보기 중
        </p>
      )}
    </ItemContentS>
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
  align-items: end;
  padding: 1.06rem;

  border-radius: 0.625rem;

  background-image: url(${(props) => props.img});

  color: white;

  button {
    outline: 1px solid;
    border-radius: 1rem;

    font-size: var(--button-mid);
    /* font-size: 14px; */
    width: 4.3125rem;
    height: 1.625rem;
    color: white;

    a {
      color: white;
    }
  }
`;

const ItemContentS = styled.div`
  height: 3.88rem;

  .Item-Name {
    display: flex;
    flex-direction: column;
    height: 2.81rem;
    gap: 0.125rem;
  }

  h2 {
    font-size: 1rem;
    margin-top: 0;
  }

  .people {
    color: var(--color-main);
    font-weight: 500;
  }

  p {
    margin-top: 3px;
  }
`;

const ItemTabS = styled.div`
  border: 1px solid white;
  border-radius: 1rem;
  padding: 0.12rem 0.86rem;
  font-size: 0.6875rem;
  width: fit-content;
`;
