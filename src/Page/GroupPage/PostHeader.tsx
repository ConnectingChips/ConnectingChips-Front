import { useState } from 'react';
import { styled } from 'styled-components';
import point3 from '../../image/Icon/3point_icon.svg';
import { PostProps } from './PostPropsType';
import DeleteModal from '../../Component/DeleteModal';
import { deleteBoard } from '../../API/Boards';
import Bind from '../../Type/Bind';
import { refreshState } from '../../data/initialData';
import { useRecoilState } from 'recoil';
interface PostHeaderProps {
  setToggleContentEdit: React.Dispatch<React.SetStateAction<boolean>>;
  postProps: PostProps;
}

const PostHeader = ({ setToggleContentEdit, postProps }: PostHeaderProps): JSX.Element => {
  const [refresh, setRefresh] = useRecoilState<number>(refreshState);
  const [modalBtn, setModalBtn] = useState(false);
  const { postData, userInfo } = postProps;
  const modalBind: Bind<boolean> = { state: modalBtn, Setter: setModalBtn };
  const deleteAction = () =>
    deleteBoard(postData.boardId).then(() => {
      setRefresh(refresh + 1);
    });
  const { profileImage, nickname, createDate } = postData;

  const PostEditBtn = () => {
    const [toggleEditBtn, setToggleEditBtn] = useState(false);
    const ToogleHandler = () => {
      setToggleEditBtn((prev) => !prev);
    };

    return userInfo.userId === postData.userId ? (
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
    ) : (
      <></>
    );
  };

  return (
    <PostHeaderS>
      <PostProfileS>
        <PostProfileImageS src={profileImage} alt='프로필 사진' />
        <PostProfileNickNameS>
          <p className='nickname'>{nickname}</p>
          <p className='date'>{createDate}</p>
        </PostProfileNickNameS>
      </PostProfileS>
      <PostEditBtn />
      <DeleteModal modalBind={modalBind} deleteAction={deleteAction} />
    </PostHeaderS>
  );
};

export default PostHeader;

const PostHeaderS = styled.div`
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
