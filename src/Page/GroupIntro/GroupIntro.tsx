import { styled, useEffect, useState, useParams } from './IntroBarrel';
import { CTAContainer, scrollTop, getMind_IntroImage } from './IntroBarrel';
import {
  HeadLine,
  MissionRule,
  GroupArticleS,
  IntroduceS,
  initMind,
  getMindInfo_Intro,
} from './IntroBarrel';
import type { MindIntroInfo, MindsType } from './IntroBarrel';
import { GroupHeader } from '../GroupPage/GroupPageBarrel';

/** 2023-08-21 GroupIntro.tsx - 메인 컴프 */
const GroupIntro = (): JSX.Element => {
  const { mindId } = useParams<string>();
  const [groupIntroImg, setGroupIntroImg] = useState<string>('');
  const [getMindInfoData, setGetMindInfoData] = useState<MindsType>(initMind);

  useEffect(() => {
    scrollTop();
    getMind_IntroImage(Number(mindId)).then((data) => setGroupIntroImg(data.introImage));
    getMindInfo_Intro(Number(mindId)).then((data: MindIntroInfo) => setGetMindInfoData(data));
  }, [mindId]);

  return (
    <GroupIntroImgS img={groupIntroImg}>
      <GroupHeader upload={false} backBtnColor='white' BGcolor='blur' />
      <BGDarkS>
        <GroupContainerS>
          <CTAContainer />
          <GroupArticleS passsort={'Intro'}>
            <HeadLine getMindInfoData={getMindInfoData} passsort={'Intro'} />
            <IntroduceS passsort={'Intro'}>{getMindInfoData.introduce}</IntroduceS>
            <MissionRule getMindInfoData={getMindInfoData} passsort={'Intro'} />
          </GroupArticleS>
        </GroupContainerS>
      </BGDarkS>
    </GroupIntroImgS>
  );
};

export default GroupIntro;

const GroupIntroImgS = styled.div<{ img: string }>`
  width: 100vw;
  height: 100dvh;
  color: white;
  background-image: url(${(props) => props.img});
  background-size: cover;
`;

const BGDarkS = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);

  display: flex;
  justify-content: center;
`;

const GroupContainerS = styled.div`
  height: 100%;
  max-width: var(--width-max);
  display: flex;
  flex-direction: column-reverse;
  width: 100%;
  margin: 0 auto;
`;
