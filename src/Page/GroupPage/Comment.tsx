import { styled } from "styled-components";
import sendIcon from "../../../src/image/Icon/send_Icon.svg";
import postInfoData from "../../data/postInfoData";
import { CommentInfo } from "../../Type/PostInfo";

/** 2023-08-25 Comment.tsx - 그룹페이지 댓글 */
const Comment = ({ Commented }: { Commented: boolean }) => {
  const commentList = postInfoData.commentList;

  // const commentname = "칩스1234";
  // const replyname = "커넥팅칩스";
  // const date = "1일 전";
  // const text = ["대박대박 대단합니다!!! 저도 칩스님처럼 작심삼칩 열심히 해야겠어요ㅜㅜ", "ㅎㅎㅎㅎ 감사합니다~! 칩스님도 득근한 하루 보내세요! :-)"];

  return (
    <CommentS>
      <h2>댓글</h2>
      <CommentListS>
        {commentList.map((comment) => {
          return <CommentBox comment={comment} key={comment.commnet_id} />;
        })}
      </CommentListS>
      {Commented && (
        <CommentFormS>
          <input placeholder="응원의 댓글을 적어주세요!" />
          <button>
            <img src={sendIcon} alt="sendIcon" />
          </button>
        </CommentFormS>
      )}
    </CommentS>
  );
};

export default Comment;

type CommentType = "comment" | "reply";

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
      <SelectContainer sort="comment" username={comment_user} imgUrl={imgUrl} date={today} content={content} />
      {reply.map((reply) => {
        const reply_user = new userName(comment.username, reply.username);
        const imgUrl = reply.profileUrl;
        const content = reply.text;

        return <SelectContainer sort="reply" username={reply_user} imgUrl={imgUrl} date={today} content={content} />;
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
      <img src={imgUrl} alt="답글프로필" />
      <CommentContentS sort={sort}>
        <div>
          <div className="profile">
            <h2>{!isReply ? username.comment_user : username.reply_user}</h2>
            <p>{date}</p>
          </div>
          <p className="text">
            {!isReply ? (
              content
            ) : (
              <>
                <p className="call">@{username.comment_user}</p> {content}
              </>
            )}
          </p>
        </div>
        <CommentOptionS>
          <h2>답글</h2>
          <p>삭제</p>
        </CommentOptionS>
      </CommentContentS>
    </CommentContainerS>
  );
};

/** 2023-08-25 Comment.tsx - 그룹페이지 댓글 */
const CommentS = styled.article`
  margin: 0 1rem;
`;

/** 2023-08-25 Comment.tsx - 그룹페이지 댓글 리스트 */
const CommentListS = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 0.69rem;
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

  background-color: ${(props) => (props.sort === "reply" ? "var(--color-bg)" : "")};
  padding: ${(props) => (props.sort === "reply" ? "1rem" : "")};

  img {
    width: 1.875rem;
  }
`;

/** 2023-08-25 Comment.tsx - 그룹페이지 댓글 내용, 답글 탭 */
const CommentContentS = styled.div<{ sort: CommentType }>`
  margin-left: 0.5rem;

  margin-top: 0.31rem;
  width: ${(props) => (props.sort === "comment" ? "19.0625rem" : "18.0625rem")};
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
  position: fixed;
  bottom: 1.7rem;
  background-color: #fff;

  border: 1px solid #e3e3e3;
  border-radius: 0.5rem;
  height: 3.5rem;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  z-index: 10;

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
