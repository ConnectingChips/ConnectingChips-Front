import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { getExampleImage } from '../../API/Mind';
import { PageSort } from '../../Type/Mind';
import { Arrow_Down, Arrow_Up } from '../ArrowBarrel';
import defaultImage from '../../image/ex_image_err.png';

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

export { CreateExample };

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

const PostImageS = styled.div`
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 100%;
  }
`;
