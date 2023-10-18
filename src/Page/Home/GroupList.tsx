import { styled, useEffect, useState, Link } from './HomeBarrel';
import { MissonTab } from '../../Component/Mission/MissionTab';
import { missionTab } from '../../data/missionTab';
import { getMindAll, getMindFilter } from '../../API/Mind';
import { TotalMind } from '../../Type/Mind';

/** 23-08-20 GroupList.tsx - 메인 컴프 */
const GroupList = (): JSX.Element => {
  const [showList, setShowList] = useState<TotalMind[]>([]);
  const [curFocused, setCurFocused] = useState<string>(missionTab[0].title);
  const curFocusBind = { curFocused, setCurFocused };
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    if (curFocused === '전체')
      getMindAll(isLogin, setIsLogin)
        .then((mindList: TotalMind[]) => setShowList(mindList))
        .catch(() => {});
    else
      getMindFilter(curFocused)
        .then((mindList) => setShowList(mindList))
        .catch(() => {});
  }, [curFocused, isLogin]);

  return (
    <GroupListS>
      <h2>작심 그룹 리스트</h2>
      <MissonTab missionTab={missionTab} focusbind={curFocusBind} />
      <GroupItemListS>
        {showList.map((mind, idx) => (
          <GroupListItem mind={mind} key={idx} />
        ))}
      </GroupItemListS>
    </GroupListS>
  );
};

export default GroupList;

const GroupListItem = ({ mind }: { mind: TotalMind }): JSX.Element => {
  const savePosition = () => sessionStorage.setItem('Home_ScrollY', String(window.scrollY));

  return (
    <Link to={`/groupIntro/${mind.mindId}`} onClick={() => savePosition()}>
      <GroupListItemS key={mind.mindId} img={mind.totalListImage}>
        <ItemContent mind={mind} />
        <button>참여하기</button>
      </GroupListItemS>
    </Link>
  );
};

const ItemContent = ({ mind }: { mind: TotalMind }): JSX.Element => {
  const message = (() => {
    if (mind.userCount === 0) return <p>작심의 첫 주인공이 되어 보세요!</p>;
    if (mind.userCount === 1)
      return (
        <p>
          <span className='people'>1</span>명 맛보기 중
        </p>
      );
    if (mind.userCount > 1)
      return (
        <p>
          <span className='people'>{mind.userCount - 1}</span>명과 함께 참여 중
        </p>
      );
    return <></>;
  })();

  return (
    <ItemContentS>
      <div className='Item-Name'>
        <ItemTabS>{mind.mindTypeName}</ItemTabS>
        <h2>{mind.name}</h2>
      </div>
      {message}
    </ItemContentS>
  );
};

const GroupListS = styled.article`
  > h2 {
    margin: 0 1rem;
  }
`;

const GroupItemListS = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 0 1rem;
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
  background-size: cover;
  color: white;

  button {
    outline: 1px solid;
    border-radius: 1rem;
    padding: 0 0.5rem;

    font-size: var(--button-mid);
    height: 1.625rem;
    color: white;
    min-width: 4.25rem;
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
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
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
