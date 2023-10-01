import { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { styled, keyframes } from 'styled-components';
import axios from 'axios';

import { GroupHeader } from '../../Component/Mission/GroupHeader';
import InfoMessage from '../../Component/UploadPost/InfoMessage';
import GroupContent from '../../Component/Mission/GroupContent';
import { SubmitButtonCTA } from '../../Component/CTA/CTAContainer';

import { notifyImgSizeLimitErr } from '../../Component/Toast/ImgSizeLimitMsg';
import { notifyNetErr } from '../../Component/Toast/NetworkErrorMsg';
import { notifyExtensionsBlockErr } from '../../Component/Toast/ExtensionsBlockMsg';

import { getUser } from '../../API/Users';
import { postCreateBoard } from '../../API/Boards';

import UploadImageIcon from '../../image/Icon/image_input_icon.png';
import { ReactComponent as AddIcon } from '../../image/Icon/add_icon.svg';
import { ReactComponent as DeleteIcon } from '../../image/Icon/delete_icon.svg';
import { ReactComponent as InfoIcon } from '../../image/Icon/Info_icon.svg';
import { ReactComponent as LoadingSpinner } from '../../image/loading.svg';

import { useNavigate } from '../GroupPage/GroupPageBarrel';
import {
  SERVER_ERROR,
  INVALID_TOKEN,
  EXPIRED_TOKEN,
  AXIOS_NETWORK_ERROR,
} from '../../constant/error';

interface Image {
  name: string;
  file: null | File;
}

const UploadPost = () => {
  const INITIAL_TEXT = '오늘 작심 성공!';
  const navigate = useNavigate();
  const { mindId } = useParams();
  const fileRef = useRef<HTMLInputElement | null>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [userId, setUserId] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [text, setText] = useState<string>(INITIAL_TEXT);
  const [image, setImage] = useState<Image>({ name: '', file: null });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await getUser();
        setUserId(res.userId);
      } catch (error) {
        console.error(error);

        // TODO: 코드 중복 수정 필요 / 공통으로 처리할 에러 정리 필요
        if (axios.isAxiosError(error)) {
          if (error.response?.status === SERVER_ERROR) {
            return notifyNetErr(); // TODO: 임시 토스트 메시지
          }

          if (error.response?.data.code === EXPIRED_TOKEN) {
            localStorage.removeItem('access_token');
            return navigate('/');
          }

          if (error.response?.data.code === INVALID_TOKEN) {
            localStorage.removeItem('access_token');
            return navigate('/');
          }

          if (error.code === AXIOS_NETWORK_ERROR) {
            return notifyNetErr();
          }
        }
      }
    })();
  }, []);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const fileName = e.target.files[0].name;
    const allowedExtensions = ['.png', '.jpg', '.jpeg'];
    const fileExtension = fileName.slice(fileName.lastIndexOf('.'));

    // 이미지 확장자 제한
    if (!allowedExtensions.includes(fileExtension.toLocaleLowerCase())) {
      return notifyExtensionsBlockErr();
    }

    // 10485760 = 10mb 제한
    if (e.target.files[0].size > 10485760) {
      // TODO: constant
      return notifyImgSizeLimitErr();
    }

    const file = e.target.files[0];
    setImage({ name: file.name, file });
    setImageUrl(URL.createObjectURL(file));
  };

  const handleFileInputClick = (e: React.MouseEvent<HTMLInputElement>) => {
    e.currentTarget.value = '';
  };

  const handleDeleteIconClick = () => {
    URL.revokeObjectURL(imageUrl);
    setImageUrl('');
    setImage({ name: '', file: null });
  };

  const handleInfoIconClick = () => {
    setIsOpen(!isOpen);
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const response = await postCreateBoard({
        mindId: Number(mindId),
        userId,
        content: text,
        image,
      });

      if (response.statusCode === 200) {
        // TODO: constant
        setIsLoading(false);
      }

      navigate(`/groupPage/${mindId}`);
    } catch (error) {
      console.error(error);

      // TODO: 코드 중복 수정 필요 / 공통으로 처리할 에러 정리 필요
      if (axios.isAxiosError(error)) {
        if (error.response?.status === SERVER_ERROR) {
          return notifyNetErr(); // TODO: 임시 토스트 메시지
        }

        if (error.response?.data.code === EXPIRED_TOKEN) {
          localStorage.removeItem('access_token');
          return navigate('/LogIn');
        }

        if (error.response?.data.code === INVALID_TOKEN) {
          localStorage.removeItem('access_token');
          return navigate('/LogIn');
        }

        if (error.code === AXIOS_NETWORK_ERROR) {
          return notifyNetErr();
        }
      }
    }
  };

  return (
    <CreatePostS>
      <UploadPostHeaderS>
        <h1>작심 글쓰기</h1>
      </UploadPostHeaderS>
      <GroupContent selected={[0, 2]} passsort='Create' />
      <CreateFormS onSubmit={handleFormSubmit}>
        {isLoading ? (
          <LoadingSpinnerContainer>
            <LoadingSpinner />
          </LoadingSpinnerContainer>
        ) : (
          <>
            <CreateFormUploadS>
              <UploadImageTitleS>
                <h2>인증샷 올리기</h2>
                <InfoIcon onClick={handleInfoIconClick} />
                {isOpen && <InfoMessage className='info_message_position' setIsOpen={setIsOpen} />}
              </UploadImageTitleS>
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
            </CreateFormUploadS>
            <CreateFormUploadS>
              <h2>오늘의 작심은 어땠나요?</h2>
              <textarea
                placeholder={INITIAL_TEXT}
                maxLength={800}
                onChange={handleTextareaChange}
              />
            </CreateFormUploadS>
          </>
        )}

        <SubmitButtonWrapperS>
          <SubmitButtonCTA />
        </SubmitButtonWrapperS>
      </CreateFormS>
    </CreatePostS>
  );
};

export default UploadPost;

const CreatePostS = styled.div`
  width: var(--width-mobile);
  // height: 100dvh; // TODO: 모바일 테스트 필수
`;

const UploadPostHeaderS = styled(GroupHeader)`
  justify-content: center;

  h1 {
    font-size: var(--header);
    font-weight: 500;
  }

  img {
    position: absolute;
    left: 1rem;
  }
`;

const CreateFormS = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CreateFormUploadS = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--height-gap);
  margin: 0 1rem;

  textarea {
    resize: none;
    height: 16.3125rem;
    border: 1px solid #e3e3e3;
    border-radius: 1rem;
    outline: none;
  }

  input[type='file'] {
    display: none;
  }
`;

const UploadImageTitleS = styled.div`
  display: flex;
  align-items: center;
  gap: 0.38rem;
  position: relative;

  svg {
    position: relative;
    top: 1px;
  }

  .info_message_position {
    position: absolute;
    top: 2.13rem;
    left: 0;
    z-index: 1;
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

const SubmitButtonWrapperS = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  bottom: 0;
  background-color: #fff;

  button {
    width: 100%;
  }
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const LoadingSpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100dvh - 362.16px);

  svg {
    animation: ${spin} 1s linear infinite;
  }
`;
