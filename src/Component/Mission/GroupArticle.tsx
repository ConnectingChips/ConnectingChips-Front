import { styled } from 'styled-components';
import { MindsType, PageSort } from '../../type/Mind';
import { MissionSingleWideS } from './MissionTab';

export const initMind: MindsType = {
  mindId: 0,
  mindTypeName: '',
  name: '',
  introduce: '',
  userCount: 0,
  writeFormat: '',
  isDoneToday: false,
  count: 0,
  canJoin: 0,
};

/** 0 : 헤드라인 1 : 소개 2 : 규칙 3 : 버튼 // passsort === Page || Intro || Create */
export const GroupArticleS = styled.article<{ passsort: PageSort }>`
  margin: ${(props) =>
    props.passsort === 'Intro'
      ? '0 1rem'
      : props.passsort === 'Create'
      ? '3.75rem 1rem 0.5rem 1rem'
      : '0.87rem 1rem 1.25rem 1rem'};
`;

interface HeadLineType {
  getMindInfoData: MindsType;
  passsort: PageSort;
}

export const HeadLine = ({ getMindInfoData, passsort }: HeadLineType) => {
  const { mindTypeName, name, userCount } = getMindInfoData;

  let message;
  if (userCount <= 0) message = '첫번째로 작심 맛보기!';
  else if (userCount === 1) message = '1명 맛보기 중';
  else message = `${userCount - 1}명과 함께 맛보기 중`;

  return (
    <HeadLineS passsort={passsort}>
      <MissionSingleWideS>
        <p>{mindTypeName}</p>
      </MissionSingleWideS>
      <h1>{name}</h1>
      {passsort !== 'Create' ? <p className='subTitle'>{message}</p> : null}
    </HeadLineS>
  );
};

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
    color: ${(props) => props.passsort === 'Page' && 'var(--font-color3)'};
  }
`;

/** 2023-08-22 MissionIntro.tsx - 미션 소개글 */
export const IntroduceS = styled.p<{ passsort: string }>`
  font-size: 0.875rem;
  margin-top: 1rem;
  color: ${(props) => props.passsort === 'Page' && 'var(--font-color2)'};
  word-break: keep-all;
`;

interface MissionRuleType {
  getMindInfoData: MindsType;
  passsort: PageSort;
}

/** 2023-08-22 MissionRule.tsx - 미션 규칙 */
export const MissionRule = ({ getMindInfoData, passsort }: MissionRuleType): JSX.Element => {
  return (
    <MissionRuleS passsort={passsort}>
      <div>인증 글쓰기 규칙</div>
      <p className={'rule'}>{getMindInfoData.writeFormat}</p>
    </MissionRuleS>
  );
};

/** 2023-08-22 MissionRule.tsx - 그룹 아티클 규칙 */
const MissionRuleS = styled.div<{ passsort: PageSort }>`
  background-color: ${(props) =>
    props.passsort === 'Create' ? 'var(--color-bg)' : 'rgba(255, 255, 255, 0.7)'};
  color: black;
  padding: 1rem;
  margin-top: ${(props) => (props.passsort === 'Create' ? '' : '1.25rem')};
  border-radius: 1rem;
  font-size: var(--head-b);
  font-weight: 500;
  p {
    margin-top: 8px;
    white-space: pre-line;
    font-size: var(--body-b);
  }

  .rule {
    color: #767676;
  }
`;

export const DivideBaS = styled.div`
  width: 100vw;
  margin: 1.25rem 0;
  height: var(--height-gap);
  background-color: var(--color-line);
  width: 100%;
`;
