import { styled } from 'styled-components';
import { myInfo } from '../../data/myInfo';
import postInfoData from '../../data/postInfoData';
import { CommentInfo } from '../../Type/PostInfo';

interface CommentHeaderProps {
  commentFlipBind: {
    commentFlip: boolean;
    setCommentFlip: React.Dispatch<React.SetStateAction<boolean>>;
  };
}
/** 댓글부분 container */
const CommentList = ({ commentFlipBind }: CommentHeaderProps) => {
  const commentList = postInfoData.commentList;
  const { commentFlip, setCommentFlip } = commentFlipBind;
  return (
    <CommentListS commentFlip={commentFlip}>
      {commentList.map((comment) => {
        return <CommentBox comment={comment} key={comment.commnet_id} />;
      })}
    </CommentListS>
  );
};

export { CommentList };

type CommentType = 'comment' | 'reply';

/** 댓글과 답글 list */
const CommentBox = ({ comment }: { comment: CommentInfo }) => {
  class userName {
    comment_user: string;
    reply_user?: string;

    constructor(comment_user: string, reply_user?: string) {
      this.comment_user = comment_user;
      this.reply_user = reply_user;
    }
  }

  const reply = comment.reply;
  const comment_user = new userName(comment.username);
  const imgUrl = comment.profileUrl;
  const today = new Date().toLocaleDateString();
  const content = comment.text;

  return (
    <CommentBoxS>
      <SelectContainer
        sort='comment'
        username={comment_user}
        imgUrl={imgUrl}
        date={today}
        content={content}
      />
      {reply.map((reply) => {
        const reply_user = new userName(comment.username, reply.username);
        const imgUrl = reply.profileUrl;
        const content = reply.text;

        return (
          <SelectContainer
            sort='reply'
            username={reply_user}
            imgUrl={imgUrl}
            date={today}
            content={content}
          />
        );
      })}
    </CommentBoxS>
  );
};

interface selectContainerProps {
  sort: CommentType;
  username: {
    comment_user: string;
    reply_user?: string;
  };
  imgUrl: string;
  date: string;
  content: string;
}

/** 댓글과 답글 box */
const SelectContainer = ({ sort, username, imgUrl, date, content }: selectContainerProps) => {
  const isReply = username.reply_user !== undefined;
  const userId = myInfo.my_id;
  return (
    <CommentContainerS sort={sort}>
      <img src={imgUrl} alt='답글프로필' />
      <CommentContentS sort={sort}>
        <div>
          <div className='profile'>
            <h2>{!isReply ? username.comment_user : username.reply_user}</h2>
            <p>{date}</p>
          </div>
          <p className='text'>{content}</p>
        </div>
        <CommentOptionS>
          {sort === 'comment' ? <h2>답글</h2> : null}
          {/* 내데이터 가져와서 댓글또는 답글 user네임이랑 같으면 삭제 보여주기 */}
          {(sort === 'comment' && userId === username.comment_user) ||
          (sort === 'reply' && userId === username.reply_user) ? (
            <p>삭제</p>
          ) : null}
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
const CommentContainerS = styled.div<{ sort: CommentType }>`
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
const CommentContentS = styled.div<{ sort: CommentType }>`
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
  }
  p {
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--font-color3);
  }
`;
