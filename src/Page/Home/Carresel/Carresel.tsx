import CarreselBtnList from './ButtonList';
import { ChipList, styled, MissionSingleWideS } from './CarreselBarrel';
import type { Mylist } from './CarreselBarrel';

/** 2023-08-29 Carresel.tsx - 캐러셀 컨텐츠 리스트 */
const Carresel = ({ myList }: { myList: Mylist[] }) => {
  return (
    <CarreselULS>
      {myList.map((mygroup, idx) => {
        return (
          <li key={idx}>
            <CarreselItem mygroup={mygroup} />
            <CarreselBtnList mind={mygroup} key={idx} />
          </li>
        );
      })}
    </CarreselULS>
  );
};

export default Carresel;

const CarreselItem = ({ mygroup }: { mygroup: Mylist }) => {
  const { mindId, mindTypeName, name, myListImage, boardCount, count } = mygroup;

  return (
    <MyMissionInfoS href={`/groupPage/${mindId}`}>
      <img src={myListImage} alt='main_image' />
      <MissionContentS>
        <MissionSingleWideS>
          <p>{mindTypeName}</p>
        </MissionSingleWideS>
        <h2>{name}</h2>
        <p>
          🔥 <span className='date'>{boardCount}</span>일차 맛보기 중
        </p>
      </MissionContentS>
      <ChipList count={count} />
    </MyMissionInfoS>
  );
};

/** 2023-09-02 Carresel.tsx - 캐러샐 영역 - Kadesti */
const CarreselULS = styled.ul`
  display: flex;
  gap: 0.75rem;

  li {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
`;

/** 2023-08-21 MyMisson.tsx - 나의 작심 현황 항목 정보 */
const MyMissionInfoS = styled.a`
  display: flex;
  border: 0.1px solid;

  color: white;
  position: relative;

  h2 {
    font-size: 1.3rem;
    margin-top: 0.38rem;
    margin-bottom: 0.5rem;
  }

  span.date {
    color: var(--color-main);
  }
`;

/** 2023-08-29 MyMisson.tsx - 나의 작심 현황 텍스트 */
const MissionContentS = styled.div`
  position: absolute;
  padding: 1rem;

  h2 {
    font-size: 1rem;
  }

  > p {
    font-weight: 400;

    .date {
      font-weight: 500;
    }
  }
`;
