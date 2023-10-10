import { styled } from 'styled-components';
import { GroupListTab, missionTab } from '../../data/missionTab';

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
const MissonTab = ({ missionTab, focusbind }: MissonTabProps): JSX.Element => {
  return (
    <MissonTabContainerS>
      <MissonTabS>
        {missionTab.map((mission, index) => {
          return (
            <MissionSingle
              text={mission.title}
              focusBind={focusbind}
              index={index}
              key={mission.tab_id}
            />
          );
        })}
      </MissonTabS>
    </MissonTabContainerS>
  );
};

/** 2023-08-20 MissonTab.tsx - 공통되는 탭 단일 */
const MissionSingle = ({ text, focusBind, index }: MissionSingleProps) => {
  const { curFocused, setCurFocused } = focusBind;
  const setFocus = () => {
    const newFocus = missionTab[index].title;
    setCurFocused(newFocus);
  };

  return (
    <MissionSingleS
      className={`button ${text === curFocused ? 'focused' : ''}`}
      onClick={() => setFocus()}
    >
      {text}
    </MissionSingleS>
  );
};

export { MissonTab, MissionSingle };

const MissonTabContainerS = styled.div`  
  margin: 0 1rem;
  margin-top: 1rem;
  overflow-x: scroll;
  
  &::-webkit-scrollbar {
    display: none;
  }
`

/** 2023-08-20 MyMisson.tsx - 작심 중인 리스트 탭 */
const MissonTabS = styled.ul`
  display: flex;
  gap: var(--height-gap);
  width: fit-content;
`;

/** 2023-08-21 MyMisson.tsx - 작심 중인 리스트 항목 */
const MissionSingleS = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;

  outline: 1px solid var(--color-disabled2);
  border-radius: 1.5rem;

  font-size: var(--button-mid);
  padding: 0.4rem 0.75rem;
  white-space: nowrap;

  &.focused {
    outline: none;
    background-color: black;
    color: white;
  }
`;

/** 2023-08-21 MyMisson.tsx - 작심 중인 리스트 항목 가로 길게 */
export const MissionSingleWideS = styled.div`
  border-radius: 1.5rem;
  padding: 0.13rem 0.81rem;
  border: 1px solid;
  width: fit-content;
  p {
    font-size: var(--button-small);
  }
`;
