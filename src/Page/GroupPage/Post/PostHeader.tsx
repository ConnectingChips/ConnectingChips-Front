import { useState } from 'react';
import { styled } from 'styled-components';
import point3 from '../../../image/Icon/3point_icon.svg';
import { PostProps } from '../PostPropsType';
import DeleteModal from '../../../Component/DeleteModal';
import { deleteBoard } from '../../../API/Boards';
import Bind from '../../../Type/Bind';
import { refreshState } from '../../../data/initialData';
import { useRecoilState } from 'recoil';
interface PostHeaderProps {
  setToggleContentEdit: React.Dispatch<React.SetStateAction<boolean>>;
  postProps: PostProps;
}

const PostHeader: React.FC<PostHeaderProps> = ({ setToggleContentEdit, postProps }) => {
  const [refresh, setRefresh] = useRecoilState<number>(refreshState);
  const [modalBtn, setModalBtn] = useState<boolean>(false);
  const modalBind: Bind<boolean> = { state: modalBtn, Setter: setModalBtn };
  const { postData, userInfo } = postProps;
  const { profileImage, nickname, createDate } = postData;

  // 게시글 삭제 핸들러
  const deletePostHandler = () =>
    deleteBoard(postData.boardId).then(() => {
      setRefresh(refresh + 1);
    });

  return (
    <PostHeaderWrapper>
      <PostProfileS>
        <PostProfileImageS src={profileImage} alt='프로필 사진' />
        <PostProfileNickNameS>
          <p className='nickname'>{nickname}</p>
          <p className='date'>{createDate}</p>
        </PostProfileNickNameS>
      </PostProfileS>
      {userInfo.userId === postData.userId && (
        <PostEditBtn setToggleContentEdit={setToggleContentEdit} setModalBtn={setModalBtn} />
      )}
      <DeleteModal modalBind={modalBind} deleteAction={deletePostHandler} />
    </PostHeaderWrapper>
  );
};

interface PostEditBtnProps {
  setToggleContentEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setModalBtn: React.Dispatch<React.SetStateAction<boolean>>;
}

const PostEditBtn: React.FC<PostEditBtnProps> = ({ setToggleContentEdit, setModalBtn }) => {
  const [toggleEditBtn, setToggleEditBtn] = useState(false);
  const ToogleHandler = () => {
    setToggleEditBtn((prev) => !prev);
  };

  return (
    <PostEditBtnS onClick={ToogleHandler}>
      <img src={point3} alt='point3_icon' />
      {toggleEditBtn && (
        <PostEditS>
          <div
            onClick={() => {
              setToggleContentEdit(true);
            }}
          >
            수정하기
          </div>
          <div
            onClick={() => {
              setModalBtn(true);
            }}
          >
            삭제하기
          </div>
        </PostEditS>
      )}
    </PostEditBtnS>
  );
};

export default PostHeader;

const PostHeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
`;

const PostProfileS = styled.div`
  display: flex;
`;

const PostProfileImageS = styled.img`
  width: 2.5rem;
  height: 2.5rem;
  aspect-ratio: 1/1;
  border-radius: 10rem;
  overflow: hidden;
  margin-right: 0.5rem;
`;

const PostProfileNickNameS = styled.div`
  display: flex;
  flex-direction: column;
  .nickname {
    font-size: 0.875rem;
    font-weight: 500;
  }
  .date {
    font-size: 0.75rem;
    color: var(--font-color3);
  }
`;

const PostEditBtnS = styled.div`
  z-index: 20;
  height: 3rem;
  display: flex;
  align-items: center;
  position: relative;
`;

const PostEditS = styled.div`
  position: absolute;
  top: 3.31rem;
  right: 0rem;
  background-color: white;
  width: 8.8125rem;
  border-radius: 0.63rem;
  border: 1px solid var(--color-main);
  div {
    height: 3.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
