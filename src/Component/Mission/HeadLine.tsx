import { styled } from 'styled-components';
import { MissionSingleWide } from './MissionTab';
import { MindsType, PageSort } from '../../Type/Mind';
interface HeadLineType {
  getMindInfoData: MindsType;
  passsort: PageSort;
}

const HeadLine = ({ getMindInfoData, passsort }: HeadLineType) => {
  const { mindTypeName, name, userCount } = getMindInfoData;

  let message;
  if (userCount <= 0) message = '첫번째로 작심 맛보기!';
  else if (userCount === 1) message = '1명 맛보기 중';
  else message = `${userCount - 1}명과 함께 맛보기 중`;

  return (
    <HeadLineS passsort={passsort}>
      <MissionSingleWide text={mindTypeName} />
      <h1>{name}</h1>
      {passsort !== 'Create' ? <p className='subTitle'>{message}</p> : null}
    </HeadLineS>
  );
};

export default HeadLine;

/** 2023-08-22 HeadLine.tsx - 그룹 인트로 아티클 */
const HeadLineS = styled.div<{ passsort: string }>`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  h1 {
    font-size: 1.5rem;
    font-weight: 500;
    margin-bottom: ${(props) => props.passsort === 'Create' && '0.75rem'};
  }

  .subTitle {
    font-size: 0.75rem;
    color: ${(props) => props.passsort === 'Page' && 'var(--font-color3)'};
  }
`;
