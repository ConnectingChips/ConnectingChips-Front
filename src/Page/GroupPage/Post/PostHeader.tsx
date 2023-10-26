import { useState } from 'react';
import { styled } from 'styled-components';
import point3 from '../../../image/Icon/3point_icon.svg';
import { PostProps } from '../PostPropsType';
import { deleteBoard } from '../../../API/Boards';
import Bind from '../../../Type/Bind';
import { refreshState } from '../../../data/initialData';
import { useRecoilState } from 'recoil';
import { ConfirmModal } from '../../MyPage/MypageBarrel';

interface PostHeaderProps {
  setIsContentEdit: React.Dispatch<React.SetStateAction<boolean>>;
  postProps: PostProps;
}

interface PostEditBtnProps {
  setIsContentEdit: React.Dispatch<React.SetStateAction<boolean>>;
  setModalBtn: React.Dispatch<React.SetStateAction<boolean>>;
}

const PostHeader: React.FC<PostHeaderProps> = ({ setIsContentEdit, postProps }) => {
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
    <PostHeaderContainer>
      <PostProfileS>
        <PostProfileImageS src={profileImage} alt='프로필 사진' />
        <PostProfileNickNameS>
          <p className='nickname'>{nickname}</p>
          <p className='date'>{createDate}</p>
        </PostProfileNickNameS>
        {userInfo.userId === postData.userId && (
          <PostEditBtn setIsContentEdit={setIsContentEdit} setModalBtn={setModalBtn} />
        )}
      </PostProfileS>
      {modalBtn ? (
        <ConfirmModal
          setConfirm={setModalBtn}
          confirmText='이 게시글을 삭제할까요?'
          action='삭제'
          method={deletePostHandler}
        />
      ) : null}
    </PostHeaderContainer>
  );
};

const PostEditBtn: React.FC<PostEditBtnProps> = ({ setIsContentEdit, setModalBtn }) => {
  const [toggleEditBtn, setToggleEditBtn] = useState(false);
  const ToogleHandler = () => {
    setToggleEditBtn((prev) => !prev);
  };

  return (
    <PostEditBtnS onClick={ToogleHandler}>
      <img src={point3} alt='postEditButton' />
      {toggleEditBtn && (
        <PostEditS>
          <div
            onClick={() => {
              setIsContentEdit(true);
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

const PostHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
`;

const PostProfileS = styled.div`
  display: flex;
  flex-grow: 1;
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
  flex-grow: 1;
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
  display: flex;
  align-items: center;
  position: relative;
`;

const PostEditS = styled.div`
  position: absolute;
  top: 3.31rem;
  right: 0;
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
