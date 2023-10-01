import { styled } from 'styled-components';
import point3 from '../../image/Icon/3point_icon.svg';
import { useEffect, useState } from 'react';
import { BoardsType, getBoardCheck, deleteBoard } from '../../API/Boards';
import DeleteModal from '../../Component/DeleteModal';
import { GetUser } from '../Home/HomeBarrel';
interface PostHeaderProps {
  editbind: {
    edit: boolean;
    setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  };
  postData: BoardsType;
  refreshBind: {
    refresh: number;
    setRefresh: React.Dispatch<React.SetStateAction<number>>;
  };
  userInfo: GetUser;
}

const PostHeader = ({
  editbind,
  postData,
  refreshBind,
  userInfo,
}: PostHeaderProps): JSX.Element => {
  const [editModalToggle, setEditModalToggle] = useState(false);
  const [modalBtn, setModalBtn] = useState(false);
  const { setEdit } = editbind;
  const { profileImage, nickname, createDate, boardId, userId } = postData;

  const handlerToogleSwitch = () => {
    setEditModalToggle((prev) => !prev);
  };

  // 자신의 게시글인지 확인

  return (
    <PostHeaderS>
      <PostHeaderProfileS>
        <PostProfileImageS>
          <img src={profileImage} alt='프로필 사진' />
        </PostProfileImageS>
        <PostProfileNickNameS>
          <p className='nickname'>{nickname}</p>
          <p className='date'>{createDate}</p>
        </PostProfileNickNameS>
      </PostHeaderProfileS>
      {userInfo.userId === userId && (
        <MoreIconS onClick={handlerToogleSwitch}>
          <img src={point3} alt='point3_icon' />
          {editModalToggle && (
            <ModalS>
              <div
                onClick={() => {
                  setEdit(true);
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
            </ModalS>
          )}
        </MoreIconS>
      )}
      {modalBtn && (
        <DeleteModal
          setConfirm={setModalBtn}
          confirmText='이 게시글을 삭제할까요?'
          action='삭제'
          method={() => deleteBoard(boardId)}
          refreshBind={refreshBind}
        />
      )}
    </PostHeaderS>
  );
};

export default PostHeader;

const PostHeaderS = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
`;

const PostHeaderProfileS = styled.div`
  height: 2.5rem;
  display: flex;
  align-items: center;
  h2 {
    margin-right: 0.5rem;
    font-size: 0.875rem;
  }
  p {
    color: var(--font-color2);
  }
`;

const MoreIconS = styled.div`
  z-index: 20;
  height: 3rem;
  display: flex;
  align-items: center;
  position: relative;
`;

const ModalS = styled.div`
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
    &:first-child {
      border-radius: 0.63rem 0.63rem 0 0;
    }
    &:last-child {
      border-radius: 0 0 0.63rem 0.63rem;
    }
  }
`;

const PostProfileImageS = styled.div`
  width: 2.5rem;
  height: 2.5rem;
  aspect-ratio: 1/1;
  border-radius: 10rem;
  overflow: hidden;
  margin-right: 0.5rem;

  img {
    width: 2.5rem;
  }
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
