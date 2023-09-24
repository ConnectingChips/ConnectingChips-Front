import { styled } from 'styled-components';
import { GNB } from '../../AppBarral';
import { CTAContainer } from '../../Component/CTA/CTAContainer';
import { GroupIntroHeader } from '../../Component/Mission/GroupHeader';
import GroupContent from '../../Component/Mission/GroupContent';
import { useEffect, useState } from 'react';
import scrollTop from '../../Hooks/scrollTop';
import { useLocation, useParams } from 'react-router-dom';
import { getMind_IntroImage } from '../../API/Mind';
/** 2023-08-21 GroupIntro.tsx - 메인 컴프 */
const GroupIntro = (): JSX.Element => {
  const { mindId } = useParams<string>();
  const [pageImage, setPageImage] = useState<string>('');
  const location = useLocation();
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
            <CTAContainer />
          </GroupIntroArticleS>
        </GroupContainerS>
      </BGDarkS>
    </GroupIntroS>
  );
};

export default GroupIntro;

const GroupIntroS = styled.div<{ img: string }>`
  width: 100vw;
  height: 100vh;
  position: relative;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-image: url(${(props) => props.img});
  background-repeat: no-repeat;
  background-size: cover;
`;

const BGDarkS = styled.div`
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
`;

const GroupContainerS = styled.div`
  height: 100%;
  margin: 0 auto;
  width: var(--width-mobile);
  display: flex;
  flex-direction: column-reverse;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const GroupIntroArticleS = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;.
`;
