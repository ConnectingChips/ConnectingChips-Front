import { useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import axios from 'axios';

import { GroupHeader } from '../../Component/Mission/GroupHeader';
import InfoMessage from '../../Component/UploadPost/InfoMessage';
import GroupContent from '../../Component/Mission/GroupContent';
import { SubmitButtonCTA } from '../../Component/CTA/CTAContainer';
import { StyledToastContainer } from '../../Component/Toast/StyledToastContainer';
import { notifyImgSizeLimitErr } from '../../Component/Toast/ImgSizeLimitMsg';

import { getUser } from '../../API/Users';
import { postCreateBoard } from '../../API/Boards';

import UploadImageIcon from '../../image/Icon/image_input_icon.png';
import { ReactComponent as AddIcon } from '../../image/Icon/add_icon.svg';
import { ReactComponent as DeleteIcon } from '../../image/Icon/delete_icon.svg';
import { ReactComponent as InfoIcon } from '../../image/Icon/Info_icon.svg';

import { useNavigate } from '../GroupPage/GroupPageBarrel';

interface Image {
  name: string;
  file: null | File;
}

/** 2023-08-24 CreatePost.tsx - 인증글쓰기 페이지 */
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

  useEffect(() => {
    (async () => {
      try {
        const res = await getUser();
        setUserId(res.userId);
      } catch (error) {
        console.error(error);
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
      console.log('비허용:: ', fileExtension); // TODO: 테스트 후 제거
      return;
    }

    // 10485760 = 10mb 제한
    if (e.target.files[0].size > 10485760) {
      return notifyImgSizeLimitErr();
    }

    const file = e.target.files[0];
    setImage({ name: file.name, file });
    setImageUrl(URL.createObjectURL(file));
  };

  const handleDeleteIconClick = () => {
    URL.revokeObjectURL(imageUrl);
    setImageUrl('');
  };

  const handleInfoIconClick = () => {
    setIsOpen(!isOpen);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await postCreateBoard({
        mindId: Number(mindId),
        userId,
        content: text,
        image,
      });
      navigate(`/groupPage/${mindId}`);
    } catch (error) {
      console.error('error:: ', error);

      if (axios.isAxiosError(error)) {
        if (error.response?.status === 500) {
          console.error(error.response?.status); // 서버 에러 status: 500
          // alert('잠시 후 다시 시도해 주세요');
        } else if (error.response?.data.code === 4012) {
          console.error(error.response?.data.code); // 만료된 토큰 code: 4012
          // alert('다시 로그인 해주세요');
          localStorage.removeItem('access_token');
          navigate('/LogIn');
        } else if (error.response?.data.code === 4011) {
          console.error(error.response?.data.code); // 유효하지 않은 토큰 code: 4011
          localStorage.removeItem('access_token');
          navigate('/LogIn');
        }
      }
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  return (
    <CreatePostS>
      <UploadPostHeaderS>
        <h1>작심 글쓰기</h1>
      </UploadPostHeaderS>
      <GroupContent selected={[0, 2]} passsort='Create' />
      <CreateFormS onSubmit={handleFormSubmit}>
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
          />
        </CreateFormUploadS>
        <CreateFormUploadS>
          <h2>오늘의 작심은 어땠나요?</h2>
          <textarea placeholder={INITIAL_TEXT} maxLength={800} onChange={handleTextareaChange} />
        </CreateFormUploadS>
        <SubmitButtonWrapperS>
          <SubmitButtonCTA />
        </SubmitButtonWrapperS>
      </CreateFormS>
      <StyledToastContainer />
    </CreatePostS>
  );
};

export default UploadPost;

/** 2023-08-24 CreatePost.tsx - 인증글쓰기 페이지 */
const CreatePostS = styled.div`
  width: var(--width-mobile);
  height: 100vh;
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

/** 2023-08-25 CreatePost.tsx - 인증글쓰기 폼 */
const CreateFormS = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

/** 2023-08-25 CreatePost.tsx - 인증글쓰기 이미지/채팅 컨테이너 */
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

  label {
    cursor: pointer;
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
