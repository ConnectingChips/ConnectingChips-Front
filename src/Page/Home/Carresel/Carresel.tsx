import { MissionSingleWide, ChipList, styled } from './CarreselBarrel';
import ImageBoxS from '../../../StyleComp/ImageBoxS';
import useMission from '../../../Hooks/useCarresel';
import { useContext } from 'react';
import { MyListContext } from '../HomeBarrel';
import { MyListContextType } from '../../../API/Context';

/** 2023-08-29 Carresel.tsx - 캐러셀 컨텐츠 리스트 */
const Carresel = () => {
  const { carreselProps } = useMission();
  const { slideRef, count, setCount, sort, setSort } = carreselProps;
  const { myList } = useContext<MyListContextType>(MyListContext);

  /** 2023-09-22 Carresel.tsx - 내 작심 현황 - Kadesti */
  const Mylist = myList.map((mygroup, idx) => {
    const { mindId, mindTypeName, name, myListImage, boardCount, count } = mygroup;

    return (
      <li key={idx}>
        <MyMissionInfoS href={`/groupPage/${mindId}`}>
          <img src={myListImage} alt='main_image' />
          <MissionContentS>
            <MissionSingleWide text={mindTypeName} />
            <h2>{name}</h2>
            <p>
              🔥 <span className='date'>{boardCount}</span>일자 맛보기 중
            </p>
          </MissionContentS>
          <ChipList count={count} />
        </MyMissionInfoS>
      </li>
    );
  });

  return (
    <div>
      <MissionListS>
        {/* 나의 작심 컨텐츠 */}
        <ImageBoxS ref={slideRef} count={count} sort={sort} length={myList.length}>
          {Mylist}
        </ImageBoxS>
      </MissionListS>
    </div>
  );
};
export default Carresel;

/** 2023-09-02 Carresel.tsx - 캐러샐 영역 - Kadesti */
const MissionListS = styled.div`
  display: flex;
  position: relative;

  margin-bottom: 0.5rem;
`;

/** 2023-08-21 MyMisson.tsx - 나의 작심 현황 항목 정보 */
const MyMissionInfoS = styled.a`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  border: 0.1px solid;
  border-radius: 0.625rem;

  color: white;
  position: relative;

  cursor: pointer;

  h2 {
    font-size: 1.3rem;
    margin-top: 0.38rem;
    margin-bottom: 0.5rem;
  }

  div,
  p,
  li,
  h2 {
    cursor: pointer;
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
    font-weight: 500;
  }
`;
