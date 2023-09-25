import { styled } from 'styled-components';
import { getMindInfoType } from '../../API/Mind';
import { MindsType } from '../../Type/Mind';
import { PageSort } from '../../Type/MissionType';

/** 2023-08-22 MissionIntro.tsx - 미션 소개글 */
const MissionIntro = ({
  getMindInfoData,
  passsort,
}: {
  getMindInfoData: MindsType;
  passsort: PageSort;
}): JSX.Element => {
  return <IntroduceS passsort={passsort}>{getMindInfoData.introduce}</IntroduceS>;
};

export default MissionIntro;

/** 2023-08-22 MissionIntro.tsx - 미션 소개글 */
const IntroduceS = styled.p<{ passsort: string }>`
  font-size: 0.875rem;
  margin-top: 1rem;
  line-height: 1.25rem;
  color: ${(props) => props.passsort === 'Page' && 'var(--font-color2)'};
  word-break: keep-all;
`;
