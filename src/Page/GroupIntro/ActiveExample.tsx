import { styled } from 'styled-components';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PageSort } from '../../Type/Mind';
import 자전거운동 from '../../image/예시사진모음/자전거운동.jpg';
import defaultImage from '../../image/ex_image_err.png';
import { Arrow_Down, Arrow_Up } from '../../Component/ArrowBarrel';
import { getExampleImage } from '../../API/Mind';

/** 2023-08-22 ActiveExample.tsx - 작심 인증 글 */
const IntroExample = ({ passsort }: { passsort: PageSort }): JSX.Element => {
  return (
    <PostS passsort={passsort}>
      <h2>인증 사진 예시</h2>
      <PostImageS>
        <img src={자전거운동} alt='업로드 사진' />
      </PostImageS>
    </PostS>
  );
};

/** 2023-08-22 ActiveExample.tsx - 작심 인증 글 */
const CreateExample = (): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [exampleImage, setExampleImage] = useState(defaultImage);
  const { mindId } = useParams();

  useEffect(() => {
    (async () => {
      try {
        const imageData = await getExampleImage(Number(mindId));
        setExampleImage(imageData);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    <PostS passsort={'Create'}>
      <CreateHeaderS>
        <h2>인증 사진 예시</h2>
        <button onClick={() => setIsOpen((prev) => !prev)}>
          {isOpen ? (
            <img src={Arrow_Up} alt='Arrow_Up' />
          ) : (
            <img src={Arrow_Down} alt='Arrow_Down' />
          )}
        </button>
      </CreateHeaderS>
      {isOpen && (
        <PostImageS>
          <img src={exampleImage} alt='업로드 사진' />
        </PostImageS>
      )}
    </PostS>
  );
};

export { IntroExample, CreateExample };

/** 2023-08-22 ActiveExample.tsx - 그룹페이지 아티클 */
const PostS = styled.article<{ passsort: PageSort }>`
  background-color: ${(props) =>
    props.passsort === 'Intro' ? 'rgba(255, 255, 255, 0.7)' : 'var(--color-bg)'};
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
    display: flex;
    align-items: center;
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
