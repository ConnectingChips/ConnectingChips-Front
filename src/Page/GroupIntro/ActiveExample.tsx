import { styled } from "styled-components";
import { useState } from "react";
import { PageSort } from "../../Type/MissionType";
import 자전거운동 from "../../image/예시사진모음/자전거운동.jpg";
import { Arrow_Down, Arrow_Up } from '../../Component/ArrowBarrel'

/** 2023-08-22 ActiveExample.tsx - 작심 인증 글 */
const IntroExample = ({ passsort }: { passsort: PageSort }): JSX.Element => {
  return (
    <PostS passsort={passsort}>
      <h2>인증 사진 예시</h2>
      <PostImageS>
        <img src={자전거운동} alt="업로드 사진" />
      </PostImageS>
    </PostS>
  );
};

/** 2023-08-22 ActiveExample.tsx - 작심 인증 글 */
const CreateExample = ({ passsort }: { passsort: PageSort }): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <PostS passsort={passsort}>
      <CreateHeaderS>
        <h2>인증 사진 예시</h2>
        <button onClick={() => setIsOpen((prev) => !prev)}>{isOpen ? <img src={Arrow_Up} alt="Arrow_Up" /> : <img src={Arrow_Down} alt="Arrow_Down" />}</button>
      </CreateHeaderS>
      {isOpen && (
        <PostImageS>
          <img src={자전거운동} alt="업로드 사진" />
        </PostImageS>
      )}
    </PostS>
  );
};

export { IntroExample, CreateExample };

/** 2023-08-22 ActiveExample.tsx - 그룹페이지 아티클 */
const PostS = styled.article<{ passsort: PageSort }>`
  background-color: ${(props) => (props.passsort === "Intro" ? "rgba(255, 255, 255, 0.7)" : "var(--color-bg)")};
  margin: 0 1rem;
  color: var(--font-color1);
  padding: 1rem;
  border-radius: 1rem;

  display: flex;
  flex-direction: column;
  gap: var(--height-gap);
`;

const CreateHeaderS = styled.div`
  display: flex;
  justify-content: space-between;

  button {
    cursor: pointer;
    div {
      cursor: pointer;
    }
  }
`;

/** 2023-08-22 ActiveExample.tsx - 그룹페이지 아티클 인증 이미지(임시) */
const PostImageS = styled.div`
  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
  }
`;
