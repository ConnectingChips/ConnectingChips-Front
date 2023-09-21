import { styled } from 'styled-components';
import { getMindInfoType } from '../../API/Mind';
import { MindsType } from '../../Type/Group';

/** 2023-08-22 MissionIntro.tsx - 미션 소개글 */
const MissionIntro = ({ getMindInfoData }: { getMindInfoData: MindsType }): JSX.Element => {
  return <IntroduceS>{getMindInfoData.introduce}</IntroduceS>;
};

export default MissionIntro;

/** 2023-08-22 MissionIntro.tsx - 미션 소개글 */
const IntroduceS = styled.p`
  margin-top: 1rem;
  line-height: 1.25rem;
`;
