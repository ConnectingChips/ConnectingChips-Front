import { useRef, useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { GroupHeader } from '../../Component/Mission/GroupHeader';
import InfoMessage from '../../Component/UploadPost/InfoMessage';
import groupList from '../../data/groupListData';
import GroupContent from '../../Component/Mission/GroupContent';
import { SubmitButtonCTA } from '../../Component/CTA/CTAContainer';
import { useLoginCheck, useNavigate } from '../GroupPage/GroupPageBarrel';
import UploadImageIcon from '../../image/Icon/image_input_icon.png';
import { ReactComponent as AddIcon } from '../../image/Icon/add_icon.svg';
import { ReactComponent as DeleteIcon } from '../../image/Icon/delete_icon.svg';
import { ReactComponent as InfoIcon } from '../../image/Icon/Info_icon.svg';
import { getMindSingle, Mind } from '../../API/userMind';
import { useParams } from 'react-router-dom';

type MindSingle = Pick<Mind, 'mindType' | 'name'>;

/** 2023-08-24 CreatePost.tsx - 인증글쓰기 페이지 */
const UploadPost = () => {
  const { intro, rule } = groupList[0];
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // useLoginCheck(navigate, "None");
  const [mindData, setMindData] = useState<MindSingle>();
  const { mindID } = useParams();

  useEffect(() => {
    const getMindSingleData = async () => {
      // TODO: url에서 mindId 가져와서 전달하기
      try {
        const mind = await getMindSingle(1);
        setMindData(mind);
      } catch (error) {
        console.error(error);
      }
    };
    getMindSingleData();
  }, []);

  const handleFileInputChange = () => {
    const fileInputLength = fileRef.current?.files?.length;
    fileInputLength && setImageUrl(URL.createObjectURL(fileRef.current!.files![0]));
  };

  const handleDeleteIconClick = () => {
    setImageUrl('');
  };

  const handleInfoIconClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <CreatePostS>
      <UploadPostHeaderS>
        <h1>작심 글쓰기</h1>
      </UploadPostHeaderS>
      <GroupTitleS>
        <ItemTabS>{mindData?.mindType}</ItemTabS>
        <h1>{mindData?.name}</h1>
      </GroupTitleS>
      <GroupContent selected={[0, 2]} passsort='Create' />
      <CreateFormS>
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
            accept='image/png, image/jpeg'
            ref={(ref) => (fileRef.current = ref)}
            onChange={handleFileInputChange}
          />
        </CreateFormUploadS>
        <CreateFormUploadS>
          <h2>오늘의 작심은 어땠나요?</h2>
          <textarea placeholder='오늘 작심 성공!' maxLength={800} />
        </CreateFormUploadS>
        <SubmitButtonWrapperS>
          <SubmitButtonCTA />
        </SubmitButtonWrapperS>
      </CreateFormS>
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

const GroupTitleS = styled.div`
  padding: 1.25rem 0 0 1rem;
  h1 {
    font-size: var(--head-a);
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

const ItemTabS = styled.div`
  border: 1px solid var(--font-color1);
  border-radius: 1rem;
  padding: 0.12rem 0.81rem;
  font-size: 0.6875rem;
  width: fit-content;
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

  button {
    width: 100%;
  }
`;
