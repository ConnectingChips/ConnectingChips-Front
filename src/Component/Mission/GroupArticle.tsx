import { styled } from 'styled-components';
import HeadLine from '../../Component/Mission/HeadLine';
import MissionRule from '../../Component/Mission/MissionRule';
import MissionIntro from './MissionIntro';
import { PostButton } from '../CTA/CTAContainer';
import { PageSort } from '../../Type/MissionType';
import { useEffect, useState } from 'react';
import { getMindInfo, getMindInfo_Intro } from '../../API/Mind';
import { useParams } from 'react-router-dom';
import { MindsType, MindIntroInfo } from '../../Type/Mind';
import { initMind } from '../../data/initialData';
interface GroupArticleProps {
  selected: number[];
  passsort: PageSort;
}

/** 0 : 헤드라인 1 : 소개 2 : 규칙 3 : 버튼 // passsort === Page || Intro || Create */
const GroupArticle = ({ selected, passsort }: GroupArticleProps): JSX.Element => {
  const { mindId } = useParams<string>();
  const [getMindInfoData, setGetMindInfoData] = useState<MindsType>(initMind);

  useEffect(() => {
    if (passsort === 'Page') {
      getMindInfo(Number(mindId)).then((data: MindsType) => {
        setGetMindInfoData(data);
      });
    } else if (passsort === 'Intro' || passsort === 'Create') {
      getMindInfo_Intro(Number(mindId)).then((data: MindIntroInfo) => {
        setGetMindInfoData(data);
      });
    }
  }, []);

  const compArr = [
    <HeadLine getMindInfoData={getMindInfoData} passsort={passsort} />,
    <MissionIntro getMindInfoData={getMindInfoData} passsort={passsort} />,
    <MissionRule getMindInfoData={getMindInfoData} passsort={passsort} />,
    <PostButton />,
  ];

  if (selected === null) return <></>;

  return (
    <GroupArticleS passsort={passsort}>
      {selected.map((el) => (
        <div key={el}>{compArr[el]}</div>
      ))}
    </GroupArticleS>
  );
};

export default GroupArticle;

/** 2023-08-22 GroupArticle.tsx - 그룹 인트로 아티클 */
const GroupArticleS = styled.article<{ passsort: PageSort }>`
  width: var(--width-mobile);
  margin: ${(props) =>
    props.passsort === 'Intro'
      ? '0 1rem 0.5rem 1rem'
      : props.passsort === 'Create'
      ? '3.75rem 1rem 0.5rem 1rem'
      : '0.87rem 1rem 1.25rem 1rem'};

  p {
    font-size: 0.875rem;
  }
`;
