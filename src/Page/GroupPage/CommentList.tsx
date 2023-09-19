import { useEffect } from 'react';
import { styled } from 'styled-components';
import { CommentType, ReplyType } from '../../API/Boards';
import { getUser } from '../../API/userService';
interface CommentHeaderProps {
  commentFlipBind: {
    commentFlip: boolean;
    setCommentFlip: React.Dispatch<React.SetStateAction<boolean>>;
  };
  commentListData: CommentType[];
}
/** 댓글부분 container */
const CommentList = ({ commentFlipBind, commentListData }: CommentHeaderProps) => {
  const { commentFlip, setCommentFlip } = commentFlipBind;
  return (
    <CommentListS commentFlip={commentFlip}>
      {commentListData.map((commentData, i) => {
        return <CommentBox commentData={commentData} key={i} />;
      })}
    </CommentListS>
  );
};

export { CommentList };

/** 댓글과 답글 list */
const CommentBox = ({ commentData }: { commentData: CommentType }) => {
  return (
    <CommentBoxS>
      <CommentBoxMaker sort='comment' commentData={commentData} />
      {commentData.replyList.map((replyData, i) => {
        return <ReplyBoxMaker sort='reply' replyData={replyData} key={i} />;
      })}
    </CommentBoxS>
  );
};

interface CommentBoxMakerProps {
  sort: 'comment';
  commentData: CommentType;
}

/** 댓글과 답글 box */
const CommentBoxMaker = ({ sort, commentData }: CommentBoxMakerProps) => {
  return (
    <CommentContainerS sort={sort}>
      <img src={commentData.profileImage} alt='답글프로필' />
      <CommentContentS sort={sort}>
        <div>
          <div className='profile'>
            <h2>{commentData.nickname}</h2>
            <p>{commentData.createDate}</p>
          </div>
          <p className='text'>{commentData.content}</p>
        </div>
        <CommentOptionS>
          <h2>답글</h2>
          <h2 className='delete'>삭제</h2>
        </CommentOptionS>
      </CommentContentS>
    </CommentContainerS>
  );
};

/** 댓글과 답글 box */
const Original = ({ sort, commentData }: CommentBoxMakerProps) => {
  return (
    <CommentContainerS sort={sort}>
      <img src={commentData.profileImage} alt='답글프로필' />
      <CommentContentS sort={sort}>
        <div>
          <div className='profile'>
            <h2>{commentData.nickname}</h2>
            <p>{commentData.createDate}</p>
          </div>
          <p className='text'>{commentData.content}</p>
        </div>
        <CommentOptionS>
          <h2>답글</h2>
          <h2 className='delete'>삭제</h2>
        </CommentOptionS>
      </CommentContentS>
    </CommentContainerS>
  );
};

interface ReplyBoxMakerProps {
  sort: 'reply';
  replyData: ReplyType;
}

/** 댓글과 답글 box */
const ReplyBoxMaker = ({ sort, replyData }: ReplyBoxMakerProps) => {
  return (
    <CommentContainerS sort={sort}>
      <img src={replyData.profileImage} alt='답글프로필' />
      <CommentContentS sort={sort}>
        <div>
          <div className='profile'>
            <h2>{replyData.nickname}</h2>
            <p>{replyData.createDate}</p>
          </div>
          <p className='text'>{replyData.content}</p>
        </div>
        <CommentOptionS>
          <h2 className='delete'>삭제</h2>
        </CommentOptionS>
      </CommentContentS>
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
  margin-top: 0.31rem;
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

  h2 {
    font-size: 0.875rem;
    &.delete {
      color: var(--font-color3);
    }
  }
`;
