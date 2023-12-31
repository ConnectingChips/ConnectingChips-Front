import { useRef } from 'react';
import styled from 'styled-components';
import UploadImageTitle from './UploadImageTitle';
import UploadWrapperS from '../../StyleComp/UploadWrapperS';
import UploadImageIcon from '../../image/Icon/image_input_icon.png';
import { ReactComponent as AddIcon } from '../../image/Icon/add_icon.svg';
import { ReactComponent as DeleteIcon } from '../../image/Icon/delete_icon.svg';

interface UploadImageProps {
  imageUrl: string;
  handleDeleteIconClick: () => void;
  handleFileInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleFileInputClick: (e: React.MouseEvent<HTMLInputElement>) => void;
}

const UploadImage = ({
  imageUrl,
  handleDeleteIconClick,
  handleFileInputChange,
  handleFileInputClick,
}: UploadImageProps) => {
  const fileRef = useRef<HTMLInputElement | null>(null);

  return (
    <UploadImageWrapperS>
      <UploadImageTitle />
      {imageUrl ? (
        <AddedImageS>
          <ImageS>
            <img src={imageUrl} alt='추가된 이미지' />
          </ImageS>
          <DeleteIcon className='delete_icon' onClick={handleDeleteIconClick} />
        </AddedImageS>
      ) : (
        <UploadImageS htmlFor='image-upload'>
          <img src={UploadImageIcon} alt='이미지 업로드' />
          <AddIcon className='add_icon' />
        </UploadImageS>
      )}
      <input
        type='file'
        id='image-upload'
        accept='image/png, image/jpeg, image/jpg'
        ref={(ref) => (fileRef.current = ref)}
        onChange={handleFileInputChange}
        onClick={handleFileInputClick}
      />
    </UploadImageWrapperS>
  );
};

export default UploadImage;

const UploadImageWrapperS = styled(UploadWrapperS)`
  input[type='file'] {
    display: none;
  }
`;

const AddedImageS = styled.div`
  width: 5rem;
  height: 5rem;
  position: relative;

  .delete_icon {
    position: absolute;
    bottom: -7.14px;
    right: -4.14px;
  }
`;

const ImageS = styled.div`
  width: 5rem;
  height: 5rem;
  border-radius: 0.625rem;
  overflow: hidden;

  img {
    width: 5rem;
    height: 5rem;
    object-fit: cover;
  }
`;

const UploadImageS = styled.label`
  width: 5rem;
  height: 5rem;
  position: relative;

  img {
    width: 5rem;
    height: 5rem;
  }

  .add_icon {
    position: absolute;
    bottom: -11.28px;
    right: -8.28px;
  }
`;
