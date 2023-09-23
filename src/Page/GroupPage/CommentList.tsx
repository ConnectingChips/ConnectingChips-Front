import { styled } from 'styled-components';
import { CommentType, ReplyType } from '../../API/Boards';
import { GetUser } from '../../Type/User';
import { deleteComment, deleteReply } from '../../API/Comment';
import { useState } from 'react';
import DeleteModal from '../../Component/DeleteModal';

interface CommentHeaderProps {
  commentFlipBind: {
    commentFlip: boolean;
    setCommentFlip: React.Dispatch<React.SetStateAction<boolean>>;
  };
  inputToggleBind: {
    inputToggle: boolean;
    setInputToggle: React.Dispatch<React.SetStateAction<boolean>>;
  };
  isCommentBind: {
    isComment: number;
    setIsComment: React.Dispatch<React.SetStateAction<number>>;
  };
  commentListData: CommentType[];
  userInfo: GetUser;
  refreshBind: {
    refresh: number;
    setRefresh: React.Dispatch<React.SetStateAction<number>>;
  };
}
/** 댓글부분 container */
const CommentList = ({
  commentFlipBind,
  inputToggleBind,
  isCommentBind,
  commentListData,
  userInfo,
  refreshBind,
}: CommentHeaderProps) => {
  const { commentFlip } = commentFlipBind;
  return (
    <CommentListS commentFlip={commentFlip}>
      {commentListData.map((commentData, i) => {
        return (
          <CommentBox
            inputToggleBind={inputToggleBind}
            isCommentBind={isCommentBind}
            commentData={commentData}
            userInfo={userInfo}
            refreshBind={refreshBind}
            key={commentData.commentId}
          />
        );
      })}
    </CommentListS>
  );
};

export { CommentList };

interface CommentBoxPorps {
  commentData: CommentType;
  userInfo: GetUser;
  inputToggleBind: {
    inputToggle: boolean;
    setInputToggle: React.Dispatch<React.SetStateAction<boolean>>;
  };
  isCommentBind: {
    isComment: number;
    setIsComment: React.Dispatch<React.SetStateAction<number>>;
  };
  refreshBind: {
    refresh: number;
    setRefresh: React.Dispatch<React.SetStateAction<number>>;
  };
}

/** 댓글과 답글 list */
const CommentBox = ({
  commentData,
  userInfo,
  inputToggleBind,
  isCommentBind,
  refreshBind,
}: CommentBoxPorps) => {
  return (
    <CommentBoxS>
      <CommentBoxMaker
        sort='comment'
        inputToggleBind={inputToggleBind}
        isCommentBind={isCommentBind}
        commentData={commentData}
        userInfo={userInfo}
        refreshBind={refreshBind}
      />
      {commentData.replyList.map((replyData, i) => {
        return (
          <ReplyBoxMaker
            sort='reply'
            replyData={replyData}
            userInfo={userInfo}
            refreshBind={refreshBind}
            key={i}
          />
        );
      })}
    </CommentBoxS>
  );
};

interface CommentBoxMakerProps {
  sort: 'comment';
  commentData: CommentType;
  userInfo: GetUser;
  inputToggleBind: {
    inputToggle: boolean;
    setInputToggle: React.Dispatch<React.SetStateAction<boolean>>;
  };
  isCommentBind: {
    isComment: number;
    setIsComment: React.Dispatch<React.SetStateAction<number>>;
  };
  refreshBind: {
    refresh: number;
    setRefresh: React.Dispatch<React.SetStateAction<number>>;
  };
}

/** 댓글 box */
const CommentBoxMaker = ({
  sort,
  commentData,
  userInfo,
  inputToggleBind,
  isCommentBind,
  refreshBind,
}: CommentBoxMakerProps) => {
  const { profileImage, nickname, createDate, content, commentId, userId } = commentData;
  const [modalBtn, setModalBtn] = useState(false);
  const { setInputToggle } = inputToggleBind;
  const { setIsComment } = isCommentBind;

  const addReplyHandler = () => {
    setInputToggle(false);
    setIsComment(commentId);
  };

  const openModal = () => setModalBtn(true);

  const deleteAction = () => deleteComment(commentId);

  return (
    <CommentContainerS sort={sort}>
      <img src={profileImage} alt='답글프로필' />
      <CommentContentS sort={sort}>
        <div>
          <div className='profile'>
            <h2>{nickname}</h2>
            <p className='date'>{createDate}</p>
          </div>
          <p className='text'>{content}</p>
        </div>
        <CommentOptionS>
          <p onClick={addReplyHandler}>답글</p>
          {userInfo.userId === userId && (
            <p onClick={openModal} className={'delete'}>
              삭제
            </p>
          )}
        </CommentOptionS>
      </CommentContentS>
      {modalBtn && (
        <DeleteModal
          setConfirm={setModalBtn}
          confirmText='이 댓글을 삭제할까요?'
          action='삭제'
          method={deleteAction}
          refreshBind={refreshBind}
        />
      )}
    </CommentContainerS>
  );
};

interface ReplyBoxMakerProps {
  sort: 'reply';
  replyData: ReplyType;
  userInfo: GetUser;
  refreshBind: {
    refresh: number;
    setRefresh: React.Dispatch<React.SetStateAction<number>>;
  };
}

/** 답글 box */
const ReplyBoxMaker = ({ sort, replyData, userInfo, refreshBind }: ReplyBoxMakerProps) => {
  const { profileImage, nickname, createDate, content, userId, replyId } = replyData;
  const [modalBtn, setModalBtn] = useState(false);
  const openModal = () => setModalBtn(true);
  const deleteAction = () => deleteReply(replyId);
  return (
    <CommentContainerS sort={sort}>
      <img src={profileImage} alt='답글프로필' />
      <CommentContentS sort={sort}>
        <div>
          <div className='profile'>
            <h2>{nickname}</h2>
            <p className='date'>{createDate}</p>
          </div>
          <p className='text'>{content}</p>
        </div>
        <CommentOptionS>
          {userInfo.userId === userId && (
            <p onClick={openModal} className='delete'>
              삭제
            </p>
          )}
        </CommentOptionS>
      </CommentContentS>
      {modalBtn && (
        <DeleteModal
          setConfirm={setModalBtn}
          confirmText='이 댓글을 삭제할까요?'
          action='삭제'
          method={deleteAction}
          refreshBind={refreshBind}
        />
      )}
    </CommentContainerS>
  );
};

const CommentListS = styled.div<{ commentFlip: boolean }>`
  height: ${(props) => (props.commentFlip ? '0px' : 'auto')};
  margin: ${(props) => (props.commentFlip ? 'none' : '1rem 0')};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const CommentBoxS = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const CommentContainerS = styled.div<{ sort: 'comment' | 'reply' }>`
  display: flex;
  align-items: start;
  min-height: 2rem;
  border-radius: 1rem;
  background-color: ${(props) => (props.sort === 'reply' ? 'var(--color-bg)' : '')};
  padding: ${(props) => (props.sort === 'reply' ? '1rem' : '')};

  img {
    width: 1.875rem;
  }
`;

const CommentContentS = styled.div<{ sort: 'comment' | 'reply' }>`
  margin-left: 0.5rem;

  width: ${(props) => (props.sort === 'comment' ? '19.0625rem' : '18.0625rem')};
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .profile {
    display: flex;
    align-items: center;
    gap: var(--height-gap);
    margin-bottom: 0.37rem;

    h2 {
      font-size: 0.875rem;
    }

    .date {
      font-size: 0.75rem;
      color: var(--font-color3);
    }
  }

  p.text {
    font-size: 0.875rem;
    color: var(--font-color2);

    p.call {
      font-size: 0.875rem;
      color: #000;
      font-weight: 500;
      display: inline;
    }
    margin-bottom: var(--height-gap);
  }
`;

const CommentOptionS = styled.div`
  display: flex;
  gap: 1.5rem;
  font-size: 0.875rem;
  .delete {
    color: var(--font-color3);
  }
`;
