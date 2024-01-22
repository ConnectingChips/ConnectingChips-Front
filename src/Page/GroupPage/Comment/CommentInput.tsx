import styled from 'styled-components';
import { useRecoilState } from 'recoil';
import { BoardsType, GetUser, useState } from '../GroupPageBarrel';
import { postAddComment } from '../../../API/Comment';
import { postAddReply } from '../../../API/Comment';
import { isCommentInputFocused, refreshState } from '../../../data/initialData';
import Bind from '../../../type/Bind';
import { useEffect, useRef } from 'react';

interface commentInputProps {
  userInfo: GetUser;
  postData: BoardsType;
  isCommentBind: Bind<number>;
}

const CommentInput = ({ userInfo, postData, isCommentBind }: commentInputProps) => {
  const { state: isComment, Setter: setIsComment } = isCommentBind;
  const [commentInputText, setCommentInputText] = useState<string>('');
  const [isInputFocused, setIsInputFocused] = useRecoilState(isCommentInputFocused);
  const [refresh, setRefresh] = useRecoilState<number>(refreshState);

  // CommentInput의 content저장하는 함수
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentInputText(e.target.value);
  };

  // input 바깥쪽누르면 되돌아감
  const handleFormClickTrue = () => {
    if (isInputFocused) {
      setIsInputFocused(false);
      setIsComment(0);
    }
  };

  // 댓글에 붙은 input누르면 하단에 붙음
  const handleFormClickFalse = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    if (!isInputFocused) {
      setIsInputFocused(true);
    }
  };

  const placeholderText = (): string => {
    if (isComment !== 0) return '답글을 적어주세요';
    return postData.commentCount > 0
      ? '응원의 댓글을 적어주세요!'
      : '가장 먼저 응원의 댓글을 적어주세요!';
  };

  // 엔터 키를 감지하는 함수
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsInputFocused(false);
      inputBtnHandler(e as any);
    }
  };

  // input 버튼 핸들러
  // 0이면 댓글추가
  // 0이아니면 답글추가인데 여기에 들어가는 숫자는 답글이 붙을 댓글의 id (commentid)
  const inputBtnHandler = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setIsInputFocused(false);
    if (commentInputText.length === 0) return;
    try {
      if (isComment === 0) {
        const AddCommentData = {
          userId: userInfo.userId,
          boardId: postData.boardId,
          content: commentInputText,
        };
        await postAddComment(AddCommentData);
      } else {
        const AddReplyData = {
          userId: userInfo.userId,
          commentId: isComment,
          content: commentInputText,
        };
        await postAddReply(AddReplyData);
        setIsComment(0);
      }
      setCommentInputText('');
      setRefresh((prevRefresh) => prevRefresh + 1);
    } catch (error) {
      console.error('오류 발생:', error);
    }
  };

  // input에 글 적으면 화살표 노란색으로 변경
  const isTyping = commentInputText.trimStart().length === 0 ? 'off' : 'on';

  // 페이지 진입시 input focus생기는 코드

  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [isInputFocused]);

  return (
    <CommentInputBGS isInputFocused={isInputFocused} onClick={handleFormClickTrue}>
      <CommentInputContainerS isInputFocused={isInputFocused} onClick={handleFormClickFalse}>
        <CommentInputS isInputFocused={isInputFocused}>
          <input
            placeholder={placeholderText()}
            value={commentInputText}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            type='text'
            maxLength={400}
            ref={isInputFocused ? inputRef : null}
          />
          <button onClick={inputBtnHandler}>
            {
              <img
                src={`${process.env.PUBLIC_URL}/assets/commentInputButton${isTyping}.svg`}
                alt='sendIcon'
              />
            }
          </button>
        </CommentInputS>
      </CommentInputContainerS>
    </CommentInputBGS>
  );
};

export { CommentInput };

const CommentInputBGS = styled.div<{ isInputFocused: boolean }>`
  ${(props) =>
    props.isInputFocused
      ? 'position: fixed; display: flex; flex-direction: column-reverse; top: 0;left: 0;right: 0;bottom: 0; z-index: 100;'
      : ''}
`;

export const CommentInputContainerS = styled.div<{ isInputFocused: boolean }>`
  background-color: white;
  padding: 0 1rem 0.5rem 1rem;
  margin-top: 0.75rem;
`;

const CommentInputS = styled.div<{ isInputFocused: boolean }>`
  background-color: var(--color-bg);
  border: 1px solid var(--color-line);
  border-radius: 0.5rem;
  width: 100%;
  box-sizing: border-box;
  padding: 1.06rem 1rem;
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.isInputFocused ? 'center' : 'space-around')};
  z-index: 10;
  input {
    font-size: 1rem;
    flex: 1;
    height: 1.25rem;
    border: none;
    background-color: transparent;
    color: var(--font-color3);
    &:focus {
      outline: none;
    }
  }
  button {
    padding: 0;
  }
`;
