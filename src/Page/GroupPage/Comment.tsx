import { styled } from 'styled-components';
import sendIcon from '../../../src/image/Icon/send_Icon.svg';
import Arrow_icon_Up from '../../image/Icon/Arrow/Arrow_icon_Up.svg';
import postInfoData from '../../data/postInfoData';
import { CommentInfo } from '../../Type/PostInfo';
import { useState } from 'react';

/** 2023-08-25 Comment.tsx - 그룹페이지 댓글 */
const Comment = ({ Commented }: { Commented: boolean }) => {
  const commentList = postInfoData.commentList;
  const [commentFlip, setCommentFlip] = useState(false);
  const [commentInput, setCommentInput] = useState<string>('');
  console.log(commentInput);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentInput(e.target.value);
  };

  return (
    <CommentS>
      {commentList.length > 0 ? (
        <>
          {' '}
          <CommentHeaderS>
            <h2>댓글 {commentList.length}</h2>
            {/* TODO: api로 댓글 개수 가져오기 */}
            <div onClick={() => setCommentFlip(!commentFlip)}>
              <img src={Arrow_icon_Up} alt='댓글접기' />
            </div>
          </CommentHeaderS>
          <CommentListS commentFlip={commentFlip}>
            {commentList.map((comment) => {
              return <CommentBox comment={comment} key={comment.commnet_id} />;
            })}
          </CommentListS>
        </>
      ) : null}

      {Commented && (
        <CommentFormS>
          <input
            placeholder='응원의 댓글을 적어주세요!'
            value={commentInput}
            onChange={handleInputChange}
          />
          <button>
            {commentInput.trimStart().length === 0 ? (
              <img src={`${process.env.PUBLIC_URL}/commentInputButtonOFF.svg`} alt='sendIcon' />
            ) : (
              <img src={`${process.env.PUBLIC_URL}/commentInputButtonON.svg`} alt='sendIcon' />
            )}
          </button>
        </CommentFormS>
      )}
    </CommentS>
  );
};

export default Comment;

type CommentType = 'comment' | 'reply';

/** 2023-09-02 Comment.tsx - 그룹페이지 댓글+답글 박스 - Kadesti */
const CommentBox = ({ comment }: { comment: CommentInfo }) => {
  const reply = comment.reply;

  class userName {
    comment_user: string;
    reply_user?: string;

    constructor(comment_user: string, reply_user?: string) {
      this.comment_user = comment_user;
      this.reply_user = reply_user;
    }
  }
  const comment_user = new userName(comment.username);

  const imgUrl = comment.profileUrl;

  //  TODO:  data 더미 추가 후 일자 연산
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

/** 2023-09-02 Comment.tsx - 그룹페이지 댓글/답글 항목 - Kadesti */
const SelectContainer = ({ sort, username, imgUrl, date, content }: selectContainerProps) => {
  const isReply = username.reply_user !== undefined;
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
          <p>삭제</p>
        </CommentOptionS>
      </CommentContentS>
    </CommentContainerS>
  );
};

/** 2023-08-25 Comment.tsx - 그룹페이지 댓글 */
const CommentS = styled.article``;

/** 2023-08-25 Comment.tsx - 그룹페이지 댓글 리스트 */
const CommentListS = styled.div<{ commentFlip: boolean }>`
  height: ${(props) => (props.commentFlip ? '0px' : 'auto')};
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
  height: 6.375rem;
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
  height: 6rem;

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

/** 2023-08-25 Comment.tsx - 그룹페이지 댓글 입력 창 */
const CommentFormS = styled.form`
  bottom: 1.7rem;
  background-color: #fff;

  border: 1px solid #e3e3e3;
  border-radius: 0.5rem;
  height: 3.5rem;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  z-index: 10;
  button {
    color: gray;
  }
  input {
    width: 16.375rem;
    height: 1.25rem;
    border: none;
    background-color: transparent;

    color: var(--font-color3);
    font-size: 0.875rem;
    font-family: Noto Sans KR;

    &:focus {
      outline: none;
    }
  }
`;

const CommentHeaderS = styled.div`
  display: flex;
  gap: 0.4rem;
`;
