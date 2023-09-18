import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import { MissonTab } from '../../Component/Mission/MissionTab';
import { useEffect, useState } from 'react';
import missionTab from '../../data/missionTab';
import { getMindAll, getMindFilter } from '../../API/userMind';
import { Mind } from '../../Type/userMind';

const mindInit = [
  {
    id: 0,
    mindTypeName: '',
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
  const [showList, setShowList] = useState<Mind[]>(mindInit);
  const [curFocused, setCurFocused] = useState<string>(missionTab[0].title);
  const curFocusBind = { curFocused, setCurFocused };

  useEffect(() => {
    if (curFocused === '전체') getMindAll().then((mindList) => setShowList(mindList));
    else getMindFilter(curFocused).then((mindList) => setShowList(mindList));
  }, [curFocused]);

  return (
    <article>
      <h2>작심 그룹 리스트</h2>
      <MissonTab missionTab={missionTab} focusbind={curFocusBind} />
      <GroupListListS>
        {showList.map((mind, idx) => (
          <GroupListItem mind={mind} key={idx} />
        ))}
      </GroupListListS>
    </article>
  );
};

export default GroupList;

const GroupListItem = ({ mind }: { mind: Mind }): JSX.Element => {
  return (
    <Link to={`/groupIntro/${mind.id}`}>
      <GroupListItemS key={mind.id} img={mind.backgroundImage}>
        <ItemContent mind={mind} />
        <button>참여하기</button>
      </GroupListItemS>
    </Link>
  );
};

const ItemContent = ({ mind }: { mind: Mind }): JSX.Element => {
  const isFirst = mind.userCount === 0;

  return (
    <ItemContentS>
      <div className='Item-Name'>
        <ItemTabS>{mind.mindTypeName}</ItemTabS>
        <h2>{mind.name}</h2>
      </div>
      {isFirst ? (
        <p>작심의 첫 주인공이 되어 보세요!</p>
      ) : (
        <p>
          <span className='people'>{mind.userCount}</span>명 함께 맛보기 중
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
