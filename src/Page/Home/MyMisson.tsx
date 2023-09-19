import { styled} from './Carresel/CarreselBarrel';

import Carresel from './Carresel/Carresel';
import ButtonList from './Carresel/ButtonList';
// import useMission from '../../Hooks/useMission';;
import { useContext } from 'react';
import { MyListContext } from './HomeBarrel';

const MyMisson = (): JSX.Element => {
  const { myList } = useContext(MyListContext);

  return (
    <article>
      <h2>나의 작심 현황({myList.length}/3)</h2>
      <CarreselContainerS>
        <div className='myMission'>
          <Carresel />
          <ButtonList />
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
