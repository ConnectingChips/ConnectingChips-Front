import { styled } from "styled-components";
import { GNB } from "../../AppBarral";
import { CTAContainer } from "../../Component/CTA/CTAContainer";
import { GroupIntroHeader } from "../../Component/Mission/GroupHeader";
import { useFindGroup } from "../../Hooks/useFindGroup";
import GroupContent from "../../Component/Mission/GroupContent";
import { useEffect } from "react";
import scrollTop from "../../Hooks/scrollTop";

/** 2023-08-21 GroupIntro.tsx - 메인 컴프 */
const GroupIntro = (): JSX.Element => {
  const { intro, rule, url } = useFindGroup("intro");

  useEffect(() => {
    scrollTop();
  }, []);

  return (
    <GroupIntroS img={url}>
      <BGDarkS>
        <GroupContainerS>
          <GroupIntroHeader />
          <GroupContent intro={intro} rule={rule} selected={[0, 1, 2]} passsort="Intro" />
          <CTAContainer />
        </GroupContainerS>
      </BGDarkS>
    </GroupIntroS>
  );
};

export default GroupIntro;

/** 2023-08-21 GroupIntro.tsx - 메인 컴프 */
const GroupIntroS = styled.div<{ img: string }>`
  position: relative;
  color: white;

  display: flex;
  flex-direction: column;
  justify-content: space-between;

  border: 1px solid;
  height: 100vh;

  background-image: url(${(props) => props.img});
`;

/** 2023-08-21 GroupIntro.tsx - 백 어두운 레이어 추가 */
const BGDarkS = styled.div`
  width: 100%;
  height: 100%;

  background-color: rgba(0, 0, 0, 0.3);
`;

/** 2023-08-21 GroupIntro.tsx - 그룹 인트로 뒤로가기 + 컨텐츠 + 예시 + CTA */
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
