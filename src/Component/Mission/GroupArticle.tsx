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
//TODO: 나중에 다른장소에 보관

/** 2023-08-22 GroupArticle.tsx - 그룹 아티클 - 0 : 헤드라인 1 : 소개 2 : 규칙 3 : 버튼 */
const GroupArticle = ({ selected, passsort }: GroupArticleProps): JSX.Element => {
  const { mindId } = useParams<string>();
  const [getMindInfoData, setGetMindInfoData] = useState<MindsType>(initMind);

  useEffect(() => {
    if (passsort === 'Page') {
      getMindInfo(Number(mindId)).then((data: MindsType) => {
        setGetMindInfoData(data);
      });
    } else if (passsort === 'Intro') {
      getMindInfo_Intro(Number(mindId)).then((data: MindIntroInfo) => {
        setGetMindInfoData(data);
      });
    }
  }, []);

  const compArr = [
    <HeadLine getMindInfoData={getMindInfoData} passsort={passsort} />,
    <MissionIntro getMindInfoData={getMindInfoData} />,
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
  margin: ${(props) =>
    props.passsort === 'Intro'
      ? '0 1rem 0.5rem 1rem'
      : props.passsort === 'Create'
      ? '0.75rem 1rem 0.5rem 1rem'
      : '0.87rem 1rem 1.25rem 1rem'};

  p {
    font-size: 0.875rem;
  }
`;
