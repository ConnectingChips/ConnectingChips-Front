import { styled } from 'styled-components';
import { CommentType, ReplyType } from '../../API/Boards';
import { GetUser } from '../../Type/User';
import { deleteComment, deleteReply, postAddReply } from '../../API/Comment';
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
  const { commentFlip, setCommentFlip } = commentFlipBind;
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
            key={i}
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
  const [modalBtn, setModalBtn] = useState(false);
  const { inputToggle, setInputToggle } = inputToggleBind;
  const { isComment, setIsComment } = isCommentBind;
  const AddReplyHander = (commentId: number) => {
    setInputToggle(false);
    setIsComment(commentId);
  };

  return (
    <CommentContainerS sort={sort}>
      <img src={commentData.profileImage} alt='답글프로필' />
      <CommentContentS sort={sort}>
        <div>
          <div className='profile'>
            <h2>{commentData.nickname}</h2>
            <p className='date'>{commentData.createDate}</p>
          </div>
          <p className='text'>{commentData.content}</p>
        </div>
        <CommentOptionS>
          <p
            onClick={() => {
              AddReplyHander(commentData.commentId);
            }}
          >
            답글
          </p>
          {userInfo.userId === commentData.userId ? (
            <p
              onClick={() => {
                setModalBtn(true);
              }}
              className={'delete'}
            >
              삭제
            </p>
          ) : null}
        </CommentOptionS>
      </CommentContentS>
      {modalBtn && (
        <DeleteModal
          setConfirm={setModalBtn}
          confirmText='이 댓글을 삭제할까요?'
          action='삭제'
          method={() => {
            return deleteComment(commentData.commentId);
          }}
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
  const [modalBtn, setModalBtn] = useState(false);
  return (
    <CommentContainerS sort={sort}>
      <img src={replyData.profileImage} alt='답글프로필' />
      <CommentContentS sort={sort}>
        <div>
          <div className='profile'>
            <h2>{replyData.nickname}</h2>
            <p className='date'>{replyData.createDate}</p>
          </div>
          <p className='text'>{replyData.content}</p>
        </div>
        <CommentOptionS>
          {userInfo.userId === replyData.userId ? (
            <p
              onClick={() => {
                setModalBtn(true);
              }}
              className='delete'
            >
              삭제
            </p>
          ) : null}
        </CommentOptionS>
      </CommentContentS>
      {modalBtn && (
        <DeleteModal
          setConfirm={setModalBtn}
          confirmText='이 댓글을 삭제할까요?'
          action='삭제'
          method={() => deleteReply(replyData.replyId)}
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

/** 2023-09-02 Comment.tsx - 댓글+ 답글 / 답글 간격 - Kadesti */
const CommentBoxS = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

/** 2023-08-25 Comment.tsx - 그룹페이지 댓글 전체 내용 */
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

/** 2023-08-25 Comment.tsx - 그룹페이지 댓글 내용, 답글 탭 */
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

/** 2023-09-02 Comment.tsx - 답글, 삭제 */
const CommentOptionS = styled.div`
  display: flex;
  gap: 1.5rem;
  font-size: 0.875rem;

  .delete {
    color: var(--font-color3);
  }
`;
