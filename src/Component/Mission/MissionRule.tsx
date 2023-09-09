import { styled } from "styled-components";
import { PageSort } from "../../Type/MissionType";

/** 2023-08-22 MissionRule.tsx - 미션 규칙 */
const MissionRule = ({ groupRule, passsort }: { groupRule: string; passsort: PageSort }): JSX.Element => {
  return (
    <MissionRuleS passsort={passsort}>
      <div>인증 글쓰기 규칙</div>
      <p className={"rule"}>{groupRule}</p>
    </MissionRuleS>
  );
};

export default MissionRule;

/** 2023-08-22 MissionRule.tsx - 그룹 아티클 규칙 */
const MissionRuleS = styled.div<{ passsort: PageSort }>`
  background-color: ${(props) => (props.passsort === "Create" ? "var(--color-bg)" : "rgba(255, 255, 255, 0.7)")};
  color: black;
  padding: 1rem;
  margin-top: 1.25rem;
  border-radius: ${(props) => (props.passsort === "Create" ? "0" : "1rem")};

  p {
    white-space: pre-line;
    font-size: 0.875rem;
  }

  .rule {
    color: #767676;
  }
`;