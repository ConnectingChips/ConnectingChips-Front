import { styled } from "styled-components";
import { PageSort } from "../../Type/MissionType";
import PostHeader from "./PostHeader";
import PostContent from "./PostContent";
import LikeBind from "../../Type/LikeBind";
import postInfoData from "../../data/postInfoData";

interface GroupActiveProps {
  passsort: PageSort;
  setCommented: React.Dispatch<React.SetStateAction<boolean>>;
  likeBind: LikeBind;
}
/** 2023-08-22 GroupActive.tsx - 작심 인증 글 */
const GroupActive = ({ passsort, setCommented, likeBind }: GroupActiveProps): JSX.Element => {
  const nowTime: string = new Date().toLocaleString();

  return (
    <GroupActiveS passsort={passsort}>
      <h2>작심 인증 글</h2>
      <PostS>
        <PostHeader nowTime={nowTime} />
        <PostImageS>
          <img src={postInfoData.image[0].url} alt="업로드 사진" />
        </PostImageS>
        <PostContent setCommented={setCommented} likeBind={likeBind} />
      </PostS>
    </GroupActiveS>
  );
};

export default GroupActive;

/** 2023-08-22 GroupActive.tsx - 작심 인증 글 */
const GroupActiveS = styled.div<{ passsort: PageSort }>`
  margin: ${(props) => (props.passsort === "Intro" ? "0 1rem 1rem 1rem" : "0 1rem")};
  margin-top: 1.25rem;
  h2 {
    margin-bottom: var(--height-gap);
  }
`;

/** 2023-08-22 GroupActive.tsx - 그룹페이지 아티클 */
const PostS = styled.article`
  background-color: var(--color-bg);
`;

/** 2023-08-22 GroupActive.tsx - 그룹페이지 아티클 인증 이미지(임시) */
const PostImageS = styled.div`
  width: 100%;
  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
  }
`;
