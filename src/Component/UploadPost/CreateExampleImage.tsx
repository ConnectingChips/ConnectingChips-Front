import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { getExampleImage } from '../../API/Mind';
import { Arrow_Down } from '../IconBarrel/ArrowBarrel';
import defaultImage from '../../image/error-example-image.png';

const CreateExampleImage = (): JSX.Element => {
  const { mindId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const [exampleImage, setExampleImage] = useState(defaultImage);

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
      <CreateHeaderS onClick={() => setIsOpen((prev) => !prev)}>
        <h2>인증 사진 예시</h2>
        <ArrowButtonS>
          <img src={Arrow_Down} alt={isOpen ? '접기' : '펼치기'} className={isOpen ? 'open' : ''} />
        </ArrowButtonS>
      </CreateHeaderS>
      {isOpen && (
        <PostImageS>
          <img src={exampleImage} alt='인증 사진 예시' />
        </PostImageS>
      )}
    </PostS>
  );
};

export default CreateExampleImage;

const PostS = styled.article`
  display: flex;
  flex-direction: column;
  gap: var(--height-gap);
  padding: 1rem;
  border-radius: 1rem;
  color: var(--font-color1);
  background-color: var(--color-bg);
`;

const CreateHeaderS = styled.div`
  display: flex;
  justify-content: space-between;
`;

const ArrowButtonS = styled.button`
  display: flex;
  align-items: center;

  img.open {
    transform: rotate(180deg);
  }
`;

const PostImageS = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  img {
    width: 100%;
  }
`;
