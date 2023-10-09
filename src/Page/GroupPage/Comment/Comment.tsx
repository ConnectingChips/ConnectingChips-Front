import styled from 'styled-components';
import { SetStateAction, useEffect, useState } from 'react';
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
  return (
    <CommentContainerS>
      <CommentBox
        CommentData={commentData}
        userInfo={userInfo}
        setInputToggle={setInputToggle}
        setIsComment={setIsComment}
      />
      {commentData.replyList.map((replyData) => {
        return (
          <CommentBox
            replyData={replyData}
            userInfo={userInfo}
            setInputToggle={setInputToggle}
            setIsComment={setIsComment}
          />
        );
      })}
    </CommentContainerS>
  );
};

export default Comment;

interface CommentBoxProps {
  CommentData?: CommentType;
  replyData?: ReplyType;
  userInfo: GetUser;
  setInputToggle: React.Dispatch<React.SetStateAction<boolean>>;
  setIsComment: React.Dispatch<React.SetStateAction<number>>;
}

const CommentBox = ({
  CommentData,
  replyData,
  userInfo,
  setInputToggle,
  setIsComment,
}: CommentBoxProps) => {
  const openModal = () => setModalBtn(true);
  const [isReply, setIsReply] = useState<boolean>(false);

  let nickname;
  let createDate;
  let content;
  let userId;
  let profileImage;
  let commentId: number;
  let replyId: number;

  useEffect(() => {
    if (CommentData) {
      setIsReply(false);
    }
    if (replyData) {
      setIsReply(true);
    }
  }, [CommentData, replyData]);

  if (CommentData) {
    nickname = CommentData.nickname;
    createDate = CommentData.createDate;
    content = CommentData.content;
    userId = CommentData.userId;
    profileImage = CommentData.profileImage;
    commentId = CommentData.commentId;
  } else if (replyData) {
    nickname = replyData.nickname;
    createDate = replyData.createDate;
    content = replyData.content;
    userId = replyData.userId;
    profileImage = replyData.profileImage;
    replyId = replyData.replyId;
  }

  const [refresh, setRefresh] = useRecoilState<number>(refreshState);

  const addReplyHandler = () => {
    setInputToggle(false);
    setIsComment(commentId);
  };

  // 댓글 삭제 핸들러
  const deleteCommentHandler = async () => {
    if (!isReply) {
      await deleteComment(commentId).then(() => {
        setRefresh(refresh + 1);
      });
    } else if (isReply) {
      await deleteReply(replyId).then(() => {
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

const CommentContainerS = styled.div`
  display: flex;
  align-items: start;
  min-height: 2rem;
  border-radius: 1rem;
  flex-direction: column;
  gap: 0.5rem;
  img {
    width: 1.875rem;
  }
`;

const CommentBoxContent = styled.p`
  font-size: 0.875rem;
  color: var(--font-color2);
  margin-bottom: var(--height-gap);
`;

const CommentBoxContainerS = styled.div<{ isReply: boolean }>`
  ${(props) =>
    props.isReply
      ? 'background-color : var(--color-bg);padding: 1rem;margin-left: 2.375rem;border-radius: 1rem;'
      : null};

  width: 19.0625rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const CommentBoxOptionS = styled.div`
  display: flex;
  gap: 1.5rem;
  font-size: 0.875rem;
  .delete {
    color: var(--font-color3);
  }
`;
