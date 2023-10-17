import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { CommentType } from '../../../API/Boards';
import { GetUser } from '../GroupPageBarrel';
import { deleteComment, deleteReply } from '../../../API/Comment';
import DeleteModal from '../../../Component/DeleteModal';
import { useRecoilState } from 'recoil';
import { isCommentInputFocused, refreshState } from '../../../data/initialData';

interface CommentProps {
  commentData: CommentType;
  userInfo: GetUser;
  setIsComment: React.Dispatch<React.SetStateAction<number>>;
}

/** 댓글 box */
const Comment = ({ commentData, userInfo, setIsComment }: CommentProps) => {
  return (
    <CommentContainerS>
      <CommentBox CommentData={commentData} userInfo={userInfo} setIsComment={setIsComment} />
      {commentData.replyList?.map((replyData) => {
        return (
          <CommentBox
            CommentData={replyData}
            userInfo={userInfo}
            setIsComment={setIsComment}
            key={replyData.replyId}
          />
        );
      })}
    </CommentContainerS>
  );
};

export default Comment;

interface CommentBoxProps {
  CommentData: CommentType;
  userInfo: GetUser;
  setIsComment: React.Dispatch<React.SetStateAction<number>>;
}

const CommentBox = ({ CommentData, userInfo, setIsComment }: CommentBoxProps) => {
  const openModal = () => setModalBtn(true);
  const [isReply, setIsReply] = useState<boolean>(false);
  const { nickname, createDate, content, userId, profileImage } = CommentData;
  const [isInputFocused, setIsInputFocused] = useRecoilState(isCommentInputFocused);

  useEffect(() => {
    if (CommentData.commentId) {
      setIsReply(false);
    }
    if (CommentData.replyId) {
      setIsReply(true);
    }
  }, [CommentData.commentId, CommentData.replyId]);

  const [refresh, setRefresh] = useRecoilState<number>(refreshState);

  // 답글 추가 핸들러
  const addReplyHandler = () => {
    if (CommentData.commentId) {
      setIsComment(CommentData.commentId);
      setIsInputFocused(true);
    }
  };

  // 댓글 삭제 핸들러
  const deleteCommentHandler = async () => {
    if (!isReply && CommentData.commentId) {
      await deleteComment(CommentData.commentId).then(() => {
        setRefresh(refresh + 1);
      });
    } else if (isReply && CommentData.replyId) {
      await deleteReply(CommentData.replyId).then(() => {
        setRefresh(refresh + 1);
      });
    }
  };

  const [modalBtn, setModalBtn] = useState(false);
  const modalBind = { state: modalBtn, Setter: setModalBtn };

  return (
    <CommentBoxContainerS isReply={isReply}>
      <CommentBoxS>
        <CommentBoxProfileImgS src={profileImage} alt='댓글프로필' />
        <div>
          <CommentBoxProfile>
            <h2>{nickname}</h2>
            <p className='date'>{createDate}</p>
          </CommentBoxProfile>
          <CommentBoxContent>{content}</CommentBoxContent>
          <CommentBoxOptionS>
            {isReply ? null : <p onClick={addReplyHandler}>답글</p>}
            {userInfo.userId === userId && (
              <p onClick={openModal} className={'delete'}>
                삭제
              </p>
            )}
          </CommentBoxOptionS>
        </div>
      </CommentBoxS>
      <DeleteModal modalBind={modalBind} deleteAction={deleteCommentHandler} />
    </CommentBoxContainerS>
  );
};

const CommentContainerS = styled.div`
  display: flex;
  align-items: start;
  min-height: 2rem;
  border-radius: 1rem;
  flex-direction: column;
  gap: 0.5rem;
  margin: 0 1rem;
  img {
    width: 1.875rem;
  }
`;

const CommentBoxContainerS = styled.div<{ isReply: boolean }>`
  ${(props) =>
    props.isReply
      ? 'background-color : var(--color-bg);padding: 1rem; margin-left: 2.375rem;border-radius: 1rem; width: calc(100% - 4.375rem);'
      : null};
`;

const CommentBoxS = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const CommentBoxProfileImgS = styled.img`
  width: 1.875rem;
  height: 1.875rem;
`;

const CommentBoxProfile = styled.div`
  display: flex;
  align-items: center;
  gap: var(--height-gap);

  h2 {
    font-size: 0.875rem;
  }
  p {
    font-size: 0.75rem;
    color: var(--font-color3);
  }
`;

const CommentBoxContent = styled.p`
  font-size: 0.875rem;
  color: var(--font-color2);
  margin: var(--height-gap) 0;
`;

const CommentBoxOptionS = styled.div`
  display: flex;
  gap: 1.5rem;
  p {
    font-size: 0.875rem;
    color: var(--font-color3);
  }
`;
