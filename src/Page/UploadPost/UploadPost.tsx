import { styled } from "styled-components";
import { GroupHeader } from "../../Component/Mission/GroupHeader";
import groupList from "../../data/groupListData";
import GroupContent from "../../Component/Mission/GroupContent";
import { SubmitButtonCTA } from "../../Component/CTA/CTAContainer";
import { useLoginCheck, useNavigate } from "../GroupPage/GroupPageBarrel";
import 업로드아이콘 from "../../image/Icon/image_upload_icon.png";

/** 2023-08-24 CreatePost.tsx - 인증글쓰기 페이지 */
const UploadPost = () => {
  const { intro, rule } = groupList[0];
  const navigate = useNavigate();

  // useLoginCheck(navigate, "None");

  return (
    <CreatePostS>
      <GroupHeader />
      <GroupContent intro={intro} rule={rule} selected={[0, 2]} passsort="Create" />
      <CreateFormS>
        {/* enctype="multipart/form-data" */}
        <CreateFormUploadS>
          <h2>인증샷 올리기</h2>
          {/* <SettingUserThumbnail /> */}
          <label htmlFor="image-upload">
            <img src={업로드아이콘} alt="업로드아이콘" />
          </label>
          <input type="file" id="image-upload" />
        </CreateFormUploadS>
        <CreateFormUploadS>
          <h2>오늘의 작심은 어땠나요?</h2>
          <textarea placeholder="오늘 작심 성공!" />
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
  /* border: 1px solid; */
  height: 100vh;
`;

/** 2023-08-25 CreatePost.tsx - 인증글쓰기 폼 */
const CreateFormS = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  /* height: 100%; */
`;

/** 2023-08-25 CreatePost.tsx - 인증글쓰기 이미지/채팅 컨테이너 */
const CreateFormUploadS = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--height-gap);
  margin: 0 1rem;

  textarea {
    height: 16.3125rem;
    border: 1px solid #e3e3e3;
    border-radius: 1rem;
  }

  label {
    cursor: pointer;
  }

  input[type="file"] {
    display: none;
  }
`;
