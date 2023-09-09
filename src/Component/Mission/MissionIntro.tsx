import { styled } from "styled-components";

/** 2023-08-22 MissionIntro.tsx - 미션 소개글 */
const MissionIntro = ({ groupText }: { groupText: string }): JSX.Element => {
  return <IntroduceS>{groupText}</IntroduceS>;
};

export default MissionIntro;

/** 2023-08-22 MissionIntro.tsx - 미션 소개글 */
const IntroduceS = styled.p`
  margin-top: 1rem;
`;
