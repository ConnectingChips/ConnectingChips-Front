import styled from 'styled-components';
import { useState } from 'react';
import { CommentType, ReplyType } from '../../../API/Boards';
import { GetUser } from '../GroupPageBarrel';
import { deleteComment, deleteReply } from '../../../API/Comment';
import DeleteModal from '../../../Component/DeleteModal';
import { useRecoilState } from 'recoil';
import { refreshState } from '../../../data/initialData';
interface CommentProps {
  commentData: CommentType;
  userInfo: GetUser;
  setInputToggle: React.Dispatch<React.SetStateAction<boolean>>;
  setIsComment: React.Dispatch<React.SetStateAction<number>>;
}

/** 댓글 box */
const Comment = ({ commentData, userInfo, setInputToggle, setIsComment }: CommentProps) => {
  const { profileImage, commentId } = commentData;
  const [modalBtn, setModalBtn] = useState(false);
  const modalBind = { state: modalBtn, Setter: setModalBtn };
  const [refresh, setRefresh] = useRecoilState<number>(refreshState);

  // 댓글 삭제 핸들러
  const deleteCommentHandler = async () => {
    await deleteComment(commentId).then(() => {
      setRefresh(refresh + 1);
    });
  };

  const CommentBox = () => {
    const { nickname, createDate, content, userId } = commentData;
    const openModal = () => setModalBtn(true);

    const addReplyHandler = () => {
      setInputToggle(false);
      setIsComment(commentId);
    };

    return (
      <CommentBoxContainerS>
        <CommentBoxS>
          <img src={profileImage} alt='댓글프로필' />
          <div className='profile'>
            <h2>{nickname}</h2>
            <p className='date'>{createDate}</p>
            <p className='text'>{content}</p>
          </div>
        </CommentBoxS>
        <CommentBoxOptionS>
          <p onClick={addReplyHandler}>답글</p>
          {userInfo.userId === userId && (
            <p onClick={openModal} className={'delete'}>
              삭제
            </p>
          )}
        </CommentBoxOptionS>
      </CommentBoxContainerS>
    );
  };

  return (
    <CommentContainerS>
      <CommentBox />
      {commentData.replyList.map((replyData, i) => {
        return <ReplyBoxMaker replyData={replyData} userInfo={userInfo} key={i} />;
      })}
      <DeleteModal modalBind={modalBind} deleteAction={deleteCommentHandler} />
    </CommentContainerS>
  );
};

export default Comment;

interface ReplyBoxMakerProps {
  replyData: ReplyType;
  userInfo: GetUser;
}

/** 답글 box */
const ReplyBoxMaker = ({ replyData, userInfo }: ReplyBoxMakerProps) => {
  const { profileImage, replyId } = replyData;
  const [modalBtn, setModalBtn] = useState(false);
  const modalBind = { state: modalBtn, Setter: setModalBtn };
  const [refresh, setRefresh] = useRecoilState<number>(refreshState);

  const deleteReplyHandler = async () => {
    await deleteReply(replyId).then(() => {
      setRefresh(refresh + 1);
    });
  };

  const ReplyContent = (): JSX.Element => {
    const { nickname, createDate, content, userId } = replyData;
    const openModal = () => setModalBtn(true);
    const WriterInfo = () => {
      return (
        <div>
          <div className='profile'>
            <h2>{nickname}</h2>
            <p className='date'>{createDate}</p>
          </div>
          <p className='text'>{content}</p>
        </div>
      );
    };

    return (
      <ReplyContentS>
        <WriterInfo />
        {userInfo.userId === userId ? (
          <CommentBoxOptionS>
            <p onClick={openModal} className='delete'>
              삭제
            </p>
          </CommentBoxOptionS>
        ) : (
          <></>
        )}
      </ReplyContentS>
    );
  };

  return (
    <ReplyContainerS>
      <img src={profileImage} alt='답글프로필' />
      <ReplyContent />
      <DeleteModal modalBind={modalBind} deleteAction={deleteReplyHandler} />
    </ReplyContainerS>
  );
};

const CommentBoxS = styled.div`
  display: flex;

  .profile {
    display: flex;
    flex-de
    align-items: center;
    gap: var(--height-gap);
    margin-bottom: 0.37rem;
  }

  .date {
    font-size: 0.75rem;
    color: var(--font-color3);
  }

  .text {
    font-size: 0.875rem;
    color: var(--font-color2);
    margin-bottom: var(--height-gap);
  }
`;

const CommentContainerS = styled.div`
  display: flex;
  align-items: start;
  min-height: 2rem;
  border-radius: 1rem;
  flex-direction: column;
  img {
    width: 1.875rem;
  }
`;

const ReplyContainerS = styled(CommentContainerS)`
  border: 2px solid var(--color-line);
  padding: 1rem;
`;

const CommentBoxContainerS = styled.div`
  margin-left: 0.5rem;

  width: 19.0625rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ReplyContentS = styled(CommentBoxContainerS)`
  width: 18.0625rem;
`;

const CommentBoxOptionS = styled.div`
  display: flex;
  gap: 1.5rem;
  font-size: 0.875rem;
  .delete {
    color: var(--font-color3);
  }
`;
