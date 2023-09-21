import { SetStateAction, useEffect, useState } from 'react';
import { styled } from 'styled-components';
import { BoardsType } from '../../API/Boards';
import { GetUser } from '../../Type/User';
import { postAddComment, postAddReply } from '../../API/Comment';
interface commentInputProps {
  commentInputBind: {
    commentInput: string;
    setCommentInput: React.Dispatch<React.SetStateAction<string>>;
  };
  inputToggleBind: {
    inputToggle: boolean;
    setInputToggle: React.Dispatch<React.SetStateAction<boolean>>;
  };
  isCommentBind: {
    isComment: number;
    setIsComment: React.Dispatch<React.SetStateAction<number>>;
  };
  postData: BoardsType;
  userInfo: GetUser;
  refreshBind: {
    refresh: number;
    setRefresh: React.Dispatch<React.SetStateAction<number>>;
  };
}

const CommentInput = ({
  commentInputBind,
  inputToggleBind,
  isCommentBind,
  postData,
  userInfo,
  refreshBind,
}: commentInputProps) => {
  const { commentInput, setCommentInput } = commentInputBind;
  const { inputToggle, setInputToggle } = inputToggleBind;
  const { isComment, setIsComment } = isCommentBind;
  const { refresh, setRefresh } = refreshBind;

  // input에 들어갈 내용 CommentInput에 넣는 함수
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentInput(e.target.value);
  };

  // 댓글에 붙은 input누르면 하단에 붙음
  const handleFormClickFalse = () => {
    setInputToggle(false);
  };

  // input 버튼 핸들러
  // 0이면 댓글추가
  // 0이아니면 답글추가인데 여기에 들어가는 숫자는 답글이 붙을 댓글의 id (commentid)
  const inputBtnHandler = (e: any) => {
    e.preventDefault();
    setInputToggle(true);
    if (commentInput.length !== 0) {
      if (isComment === 0) {
        const AddCommentData = {
          userId: userInfo.userId,
          boardId: postData.boardId,
          content: commentInput,
        };
        postAddComment(AddCommentData);
        setCommentInput('');
      } else if (isComment !== 0) {
        const AddReplyData = {
          userId: userInfo.userId,
          commentId: isComment,
          content: commentInput,
        };
        postAddReply(AddReplyData);
        setCommentInput('');
      }
    }
    setRefresh(refresh + 1);
  };

  // 댓글 개수에 따라 input placeholder 변경
  const placeholderText =
    postData.commentCount > 0 ? '응원의 댓글을 적어주세요!' : '가장 먼저 응원의 댓글을 적어주세요!';

  // input에 글 적으면 화살표 노란색으로 변경
  const isTyping = commentInput.trimStart().length === 0 ? 'off' : 'on';

  return (
    <CommentFormS onClick={handleFormClickFalse} inputToggle={inputToggle}>
      <input
        placeholder={placeholderText}
        value={commentInput}
        onChange={handleInputChange}
        type='text'
        maxLength={400}
      />
      <button onClick={inputBtnHandler}>
        {<img src={`${process.env.PUBLIC_URL}/commentInputButton${isTyping}.svg`} alt='sendIcon' />}
      </button>
    </CommentFormS>
  );
};

export { CommentInput };

const CommentFormS = styled.form<{ inputToggle: boolean }>`
  ${(props) => (props.inputToggle ? '' : 'position: fixed; bottom: 0;')}

  background-color: #fff;
  border: 1px solid #e3e3e3;
  border-radius: 0.5rem;
  height: 3.5rem;
  display: flex;
  align-items: center;
  padding: 0 1.1rem;
  z-index: 10;
  input {
    width: 16.4rem;
    height: 1.25rem;
    border: none;
    background-color: transparent;
    color: var(--font-color3);
  }
`;
