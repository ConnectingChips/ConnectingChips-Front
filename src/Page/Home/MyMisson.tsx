import { styled } from './Carresel/CarreselBarrel';
// FIXME: 사라질 코드
import { GroupInfoType } from '../../Type/MissionType';

import Carresel from './Carresel/Carresel';
import ButtonList from './Carresel/ButtonList';
import useMission from '../../Hooks/useMission';
// import { MyListData } from '../../Type/ListType';

/** 2023-08-20 MyMission.tsx - 작심 중인 리스트 */
// TODO: 갈아끼울 코드
// const MyMisson = ({ myList }: { myList: MyListData[] }): JSX.Element => {

// FIXME: 사라질 코드
const MyMisson = ({ mygrouplist }: { mygrouplist: GroupInfoType[] }): JSX.Element => {
  const { carreselProps, buttonDataProps } = useMission();
  return (
    <MyMissonS>
      {/* TODO: 갈아끼울 코드 */}
      {/* <h2>나의 작심 현황({myList.length}/3)</h2> */}

      {/* FIXME: 사라질 코드 */}
      <h2>나의 작심 현황({mygrouplist.length}/3)</h2>
      <CarreselContainerS>
        <MyMissionULS>
          <Carresel carreselProps={carreselProps} />
          <ButtonList buttonListProps={buttonDataProps} />
        </MyMissionULS>
      </CarreselContainerS>
    </MyMissonS>
  );
};

export default MyMisson;

const MyMissonS = styled.article`

`

/** 캐러샐 + 버튼 */
const CarreselContainerS = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-wrap: wrap;

  margin-bottom: 1.25rem;

  /* overscroll-behavior: contain; */
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

/** 2023-08-20 MyMisson.tsx - 나의 작심 현황 리스트 */
const MyMissionULS = styled.div`
  margin-bottom: 1rem;
  margin-top: 1rem;
  position: relative;
`;
