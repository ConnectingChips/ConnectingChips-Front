import { styled } from 'styled-components';
import { MissionSingleWide } from './MissionTab';
import { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

type grouptPath = '' | 'groupIntro' | 'groupPage';
/** 2023-08-22 HeadLine.tsx - 타이틀 / 태그 / n일차 */
const HeadLine = (): JSX.Element => {
  const { uuid } = useParams();

  const [urlPath, setUrlPath] = useState<grouptPath | string>('');
  const location = useLocation();

  const url = location.pathname;
  const keyword = 'groupIntro';
  const extractedValue = url.split('/').find((part) => part === keyword);

  if (extractedValue) setUrlPath(extractedValue);
  else setUrlPath('groupPage');

  // 실제 axios요청으로 바뀔 부분
  // const groupInfo = groupListData.find((groupData) => groupData.group_id === Number(uuid));
  // if (groupInfo === undefined) return <></>;

  // let message = '';
  // const memberLength = groupInfo.memberList.length;

  // if (memberLength <= 0) message = '첫번째로 작심 맛보기!';
  // else if (memberLength === 1) message = '1명 맛보기 중';
  // else message = `${memberLength - 1}명과 함께 맛보기 중`;

  // const { tab, title } = groupInfo;

  return (
    <HeadLineS>
      {/* <MissionSingleWide text={tab} />
      <h1>{title}</h1>
      <p className={urlPath === 'groupIntro' ? '' : 'subTitle'}>{message}</p> */}
    </HeadLineS>
  );
};

export default HeadLine;

/** 2023-08-22 HeadLine.tsx - 그룹 인트로 아티클 */
const HeadLineS = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  h1 {
    font-size: 1.5rem;
    font-weight: 500;
  }

  p {
    font-size: 0.75rem;

    &.subTitle {
      color: var(--font-color2);
    }
  }
`;
