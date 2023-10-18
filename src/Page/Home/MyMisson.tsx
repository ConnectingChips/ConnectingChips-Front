import { styled } from './Carresel/CarreselBarrel';
import Carresel from './Carresel/Carresel';
import { Mylist } from '../../Type/Mind';

const MyMisson = ({ myList }: { myList: Mylist[] }): JSX.Element => {
  return (
    <article>
      <h2 style={{ margin: '0 1rem' }}>나의 작심 현황({myList.length}/3)</h2>
      <CarreselContainerS>
        <Carresel myList={myList} />
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
  padding: 0 1rem;
  margin-top: 0.5rem;

  /* overscroll-behavior: contain; */
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;
