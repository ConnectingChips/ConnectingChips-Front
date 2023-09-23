import { styled } from 'styled-components';
import { GNB } from '../../AppBarral';
import { CTAContainer } from '../../Component/CTA/CTAContainer';
import { GroupIntroHeader } from '../../Component/Mission/GroupHeader';
import GroupContent from '../../Component/Mission/GroupContent';
import { useEffect, useState } from 'react';
import scrollTop from '../../Hooks/scrollTop';
import { useParams } from 'react-router-dom';
import { getMind_IntroImage } from '../../API/Mind';
/** 2023-08-21 GroupIntro.tsx - 메인 컴프 */
const GroupIntro = (): JSX.Element => {
  const { mindId } = useParams<string>();
  const [pageImage, setPageImage] = useState<string>('');
  useEffect(() => {
    scrollTop();

    getMind_IntroImage(Number(mindId)).then((data) => {
      setPageImage(data.introImage);
    });

    setPageImage(pageImage);
  }, []);

  return (
    <GroupIntroS img={pageImage}>
      <BGDarkS>
        <GroupContainerS>
          <GroupIntroHeader />
          <GroupIntroArticleS>
            <GroupContent selected={[0, 1, 2]} passsort='Intro' />
            {/* TODO: 참여하기 : 로그인 상태라면 참여 요청을 보내고 작심 그룹 페이지로 라우팅 / 비로그인 상태라면 로그인 페이지로 이동  */}
            <CTAContainer />
          </GroupIntroArticleS>
        </GroupContainerS>
      </BGDarkS>
    </GroupIntroS>
  );
};

export default GroupIntro;

const GroupIntroS = styled.div<{ img: string }>`
  position: relative;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  background-image: url(${(props) => props.img});
`;

const BGDarkS = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
`;

const GroupContainerS = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const GroupIntroArticleS = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;
