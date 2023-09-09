import { styled } from "styled-components";
import { GroupListTab } from "../../Type/MissionType";
import missionTab from "../../data/missionTab";

/** 2023-08-21 MyMisson.tsx - 작심 중인 리스트 Props */
type MissonTabProps = {
  missionTab: GroupListTab[];
  focusbind: {
    curFocused: string;
    setCurFocused: React.Dispatch<React.SetStateAction<string>>;
  };
};

/** 2023-08-21 MyMisson.tsx - 작심 중인 리스트 항목 타입 */
type MissionSingleProps = {
  text: string;
  focusBind: {
    curFocused: string;
    setCurFocused: React.Dispatch<React.SetStateAction<string>>;
  };
  index: number;
};

/** 2023-08-20 MissonTab.tsx - 공통되는 탭 리스트 */
// const MissonTab = ({ missionTab, focusbind }: MissonTabProps): JSX.Element => {
const MissonTab = ({ missionTab, focusbind }: MissonTabProps): JSX.Element => {
  return (
    <MyMissonTabS>
      {missionTab.map((mission, index) => {
        return <MissionSingle text={mission.title} focusBind={focusbind} index={index} key={mission.tab_id} />;
      })}
    </MyMissonTabS>
  );
};

/** 2023-08-20 MissonTab.tsx - 공통되는 탭 단일 */
const MissionSingle = ({ text, focusBind, index }: MissionSingleProps) => {
  // const { isFocus, setIsFocus } = focusBind;
  const { curFocused, setCurFocused } = focusBind;
  const setFocus = () => {
    const newFocus = missionTab[index].title;
    setCurFocused(newFocus);
  };

  return (
    <MissionSingleS className={`button ${text === curFocused ? "focused" : ""}`} onClick={setFocus}>
      {text}
    </MissionSingleS>
  );
};

/** 2023-08-21 MissonTab.tsx - 공통되는 탭 단일 / 가로 확장 */
const MissionSingleWide = ({ text }: { text: string }) => {
  return (
    <MissionSingleWideS>
      <p>{text}</p>
    </MissionSingleWideS>
  );
};

export { MissonTab, MissionSingle, MissionSingleWide };

/** 2023-08-20 MyMisson.tsx - 작심 중인 리스트 탭 */
const MyMissonTabS = styled.ul`
  display: flex;
  margin-top: 1rem;
`;

/** 2023-08-21 MyMisson.tsx - 작심 중인 리스트 항목 */
const MissionSingleS = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;

  border: 1px solid;
  border-radius: 1.5rem;

  font-size: 0.8125rem;
  padding: 0.4rem 0.8rem;

  &:not(:first-child) {
    margin-left: var(--height-gap);
  }

  &.focused {
    background-color: black;
    color: white;
  }
`;

/** 2023-08-21 MyMisson.tsx - 작심 중인 리스트 항목 가로 길게 */
const MissionSingleWideS = styled.div`
  border-radius: 1.5rem;

  padding: 0.1rem 0.8rem;

  border: 1px solid;
  width: fit-content;

  font-size: 0.6875rem;
`;
