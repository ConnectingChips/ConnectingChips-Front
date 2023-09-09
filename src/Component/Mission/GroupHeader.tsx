import { styled } from "styled-components";
import { Arrow_Left_B, Arrow_Left_W } from "../ArrowBarrel";
import post_Icon from "../../image/Icon/post_Icon.svg";
import { Link, useLocation } from "react-router-dom";

/** 2023-08-25 GroupHeader.tsx - 뒤로가기 핸들러 */
const goBack = (): void => {
  window.history.back();
};

/** 2023-08-25 GroupHeader.tsx - 그룹 페이지 헤더 */
const GroupHeader = (): JSX.Element => {
  const path = useLocation().pathname;
  const isUpload = path.indexOf("/upload") !== -1;

  return (
    <GroupBGHeaderS>
      <img src={Arrow_Left_B} onClick={goBack} alt="Arrow icon" />
      {!isUpload && (
        <Link to="/uploadPost/1">
          <img src={post_Icon} alt="post icon" />
        </Link>
      )}
    </GroupBGHeaderS>
  );
};

/** 2023-08-22 GroupHeader.tsx - 그룹 인트로 뒤로가기 */
const GroupIntroHeader = (): JSX.Element => {
  return (
    <GroupHeaderS onClick={goBack}>
      <img src={Arrow_Left_W} alt="Arrow icon" />
    </GroupHeaderS>
  );
};

export { GroupHeader, GroupIntroHeader };

/** 2023-08-22 GroupHeader.tsx - 그룹 인트로 뒤로가기 */
const GroupHeaderS = styled.header`
  /* position: fixed; */
  cursor: pointer;
  position: sticky;
  top: 0;

  height: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;

  // 아래 비치게 하기
  backdrop-filter: blur(10px);
`;

/** 2023-08-22 GroupHeader.tsx - 그룹페이지 상단 고정 */
const GroupBGHeaderS = styled(GroupHeaderS)`
  background-color: rgba(255, 255, 255, 0.5);
  cursor: default;

  z-index: 10;

  img {
    cursor: pointer;
  }

  // 자연스럽게 붙이기
  /* padding-top: 3rem;
top: -2rem; */
`;
