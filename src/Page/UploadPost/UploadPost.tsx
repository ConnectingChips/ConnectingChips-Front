import { useRef, useState } from 'react';
import { styled } from 'styled-components';
import { GroupHeader } from '../../Component/Mission/GroupHeader';
import groupList from '../../data/groupListData';
import GroupContent from '../../Component/Mission/GroupContent';
import { SubmitButtonCTA } from '../../Component/CTA/CTAContainer';
import { useLoginCheck, useNavigate } from '../GroupPage/GroupPageBarrel';
import UploadImageIcon from '../../image/Icon/image_input_icon.png';
import { ReactComponent as AddIcon } from '../../image/Icon/add_icon.svg';
import { ReactComponent as DeleteIcon } from '../../image/Icon/delete_icon.svg';

/** 2023-08-24 CreatePost.tsx - 인증글쓰기 페이지 */
const UploadPost = () => {
  const { intro, rule } = groupList[0];
  const navigate = useNavigate();
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  // useLoginCheck(navigate, "None");

  const handleFileInputChange = () => {
    const fileInputLength = fileRef.current?.files?.length;
    fileInputLength && setImageUrl(URL.createObjectURL(fileRef.current!.files![0]));
  };

  const handleDeleteIconClick = () => {
    setImageUrl('');
  };

  return (
    <CreatePostS>
      <UploadPostHeaderS>
        <h1>작심 글쓰기</h1>
      </UploadPostHeaderS>
      <GroupTitleS>
        <ItemTabS>헬스</ItemTabS>
        <h1>몸에서 닭다리 빼기</h1>
      </GroupTitleS>
      <GroupContent intro={intro} rule={rule} selected={[0, 2]} passsort='Create' />
      <CreateFormS>
        {/* enctype="multipart/form-data" */}
        <CreateFormUploadS>
          <h2>인증샷 올리기</h2>
          {/* <SettingUserThumbnail /> */}
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
        <SubmitButtonCTA />
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
