import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { styled, keyframes } from 'styled-components';
import axios from 'axios';

import { CreateExample } from '../../Component/UploadPost/CreateExample';
import UploadPostHeader from '../../Component/UploadPost/UploadPostHeader';
import UploadImage from '../../Component/UploadPost/UploadImage';
import UploadText from '../../Component/UploadPost/UploadText';
import { SubmitButtonCTA } from '../../Component/CTA/CTAContainer';
import { DivideBaS } from '../../Component/Mission/GroupArticle';
import {
  GroupArticleS,
  HeadLine,
  MissionRule,
  initMind,
} from '../../Component/Mission/GroupArticle';

import { notifyImgSizeLimitErr } from '../../Component/Toast/ImgSizeLimitMsg';
import { notifyNetErr } from '../../Component/Toast/NetworkErrorMsg';
import { notifyExtensionsBlockErr } from '../../Component/Toast/ExtensionsBlockMsg';

import { getUser } from '../../API/Users';
import { postCreateBoard } from '../../API/Boards';
import { getMindInfo_Intro } from '../../API/Mind';

import { ReactComponent as LoadingSpinner } from '../../image/loading.svg';
import { MindIntroInfo, MindsType } from '../../Type/Mind';
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
  const FILE_SIZE_LIMIT_10MB = 10485760;

  const navigate = useNavigate();
  const { mindId } = useParams();

  const [userId, setUserId] = useState<number>(0);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [text, setText] = useState<string>(INITIAL_TEXT);
  const [image, setImage] = useState<Image>({ name: '', file: null });
  const [isLoading, setIsLoading] = useState(false);
  const [getMindInfoData, setGetMindInfoData] = useState<MindsType>(initMind);

  useEffect(() => {
    (async () => {
      try {
        const res = await getUser();
        setUserId(res.userId);
        getMindInfo_Intro(Number(mindId)).then((data: MindIntroInfo) => setGetMindInfoData(data));
      } catch (error) {
        console.error(error);

        // TODO: 코드 중복 수정 필요 / 공통으로 처리할 에러 정리 필요
        if (axios.isAxiosError(error)) {
          if (error.response?.status === SERVER_ERROR) {
            return notifyNetErr();
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

    if (!allowedExtensions.includes(fileExtension.toLocaleLowerCase())) {
      return notifyExtensionsBlockErr();
    }

    if (e.target.files[0].size > FILE_SIZE_LIMIT_10MB) {
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
        setIsLoading(false);
      }

      navigate(`/groupPage/${mindId}`);
    } catch (error) {
      console.error(error);

      // TODO: 코드 중복 수정 필요 / 공통으로 처리할 에러 정리 필요
      if (axios.isAxiosError(error)) {
        if (error.response?.status === SERVER_ERROR) {
          return notifyNetErr();
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
  };

  return (
    <CreatePostS>
      <UploadPostHeader />
      <GroupArticleS passsort={'Create'}>
        <HeadLine getMindInfoData={getMindInfoData} passsort={'Create'} />
        <MissionRule getMindInfoData={getMindInfoData} passsort={'Create'} />
      </GroupArticleS>
      <CreateExample />
      <DivideBaS />
      <CreateFormS onSubmit={handleFormSubmit}>
        {isLoading ? (
          <LoadingSpinnerContainer>
            <LoadingSpinner />
          </LoadingSpinnerContainer>
        ) : (
          <>
            <UploadImage
              imageUrl={imageUrl}
              handleDeleteIconClick={handleDeleteIconClick}
              handleFileInputChange={handleFileInputChange}
              handleFileInputClick={handleFileInputClick}
            />
            <UploadText initialText={INITIAL_TEXT} handleTextareaChange={handleTextareaChange} />
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
  width: 100%;
  max-width: var(--width-max);
`;

const CreateFormS = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
