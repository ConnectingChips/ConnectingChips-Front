import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { getExampleImage } from '../../API/Mind';
import { Arrow_Down } from '../ArrowBarrel';
import defaultImage from '../../image/error-example-image.png';

const ExampleImage = (): JSX.Element => {
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
    <PostS>
      <CreateHeaderS>
        <h2>인증 사진 예시</h2>
        <ArrowButtonS onClick={() => setIsOpen((prev) => !prev)}>
          <img src={Arrow_Down} alt={isOpen ? '접기' : '펼치기'} className={isOpen ? 'open' : ''} />
        </ArrowButtonS>
      </CreateHeaderS>
      {isOpen && (
        <PostImageS>
          <img src={exampleImage} alt='업로드 사진' />
        </PostImageS>
      )}
    </PostS>
  );
};

export default ExampleImage;

const PostS = styled.article`
  background-color: var(--color-bg);
  margin: 0 1rem;
  color: var(--font-color1);
  padding: 1rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  gap: var(--height-gap);
`;

const ArrowButtonS = styled.button`
  img.open {
    transform: rotate(180deg);
  }
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
