import { styled } from "./Carresel/CarreselBarrel";
import { GroupInfoType } from "../../Type/MissionType";
import Carresel from "./Carresel/Carresel";
import ButtonList from "./Carresel/ButtonList";
import useMission from "../../Hooks/useMission";

/** 2023-08-20 MyMission.tsx - 작심 중인 리스트 */
const MyMisson = ({ mygrouplist }: { mygrouplist: GroupInfoType[] }): JSX.Element => {
  const { carreselProps, buttonDataProps } = useMission();
  return (
    <MyMissonS>
      <h2>나의 작심 현황({mygrouplist.length}/3)</h2>
      <MyMissionULS>
        <Carresel carreselProps={carreselProps} />
        <ButtonList buttonListProps={buttonDataProps} />
      </MyMissionULS>
    </MyMissonS>
  );
};

export default MyMisson;

/** 2023-08-20 MyMisson.tsx - 나의 작심 현황 전체 */
const MyMissonS = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  margin-bottom: 2rem;

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
