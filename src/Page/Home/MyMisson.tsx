import { styled, useEffect, useState } from './Carresel/CarreselBarrel';
// FIXME: 사라질 코드
import { GroupInfoType } from '../../Type/MissionType';

import Carresel from './Carresel/Carresel';
import ButtonList from './Carresel/ButtonList';
import useMission from '../../Hooks/useMission';
import { getMyList } from '../../API/userMind';
import { Mylist } from '../../Type/userMind';

const initMylist = [
  {
    id: 0,
    type: '',
    name: '',
    count: 0,
    boardCount: 0,
    image: '',
    isDoneToday: false,
  },
];

const MyMisson = (): JSX.Element => {
  const { carreselProps, buttonDataProps } = useMission();
  const [myList, setMylist] = useState<Mylist[]>(initMylist);
  useEffect(() => {
    getMyList().then(res=> setMylist(res));
  }, []);

  return (
    <article>
      <h2>나의 작심 현황({myList.length}/3)</h2>
      <CarreselContainerS>
        <div className='myMission'>
          <Carresel carreselProps={carreselProps} />
          <ButtonList buttonListProps={buttonDataProps} />
        </div>
      </CarreselContainerS>
    </article>
  );
};


export default MyMisson;

/** 캐러샐 + 버튼 */
const CarreselContainerS = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-wrap: wrap;

  margin-top: 0.5rem;
  margin-bottom: 1.25rem;

  /* overscroll-behavior: contain; */
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }

  div.myMission {
    position: relative;
  }
`;
