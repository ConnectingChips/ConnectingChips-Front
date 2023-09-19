import { useEffect } from 'react';
import { styled } from 'styled-components';
import postInfoData from '../../data/postInfoData';
import { BoardsType } from '../../API/Boards';
interface commentInputProps {
  commentInputBind: {
    commentInput: string;
    setCommentInput: React.Dispatch<React.SetStateAction<string>>;
  };
  inputToggleBind: {
    inputToggle: boolean;
    setInputToggle: React.Dispatch<React.SetStateAction<boolean>>;
  };
  postData: BoardsType;
}

const CommentInput = ({ commentInputBind, inputToggleBind, postData }: commentInputProps) => {
  const { commentInput, setCommentInput } = commentInputBind;
  const { inputToggle, setInputToggle } = inputToggleBind;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentInput(e.target.value);
  };

  const handleFormClickFalse = () => {
    setInputToggle(false);
  };

  const handleFormClickTrue = (e: any) => {
    e.preventDefault();
    setInputToggle(true);
  };

  // 댓글없으면 input placeholder 변경
  const placeholderText =
    postData.commentCount > 0 ? '응원의 댓글을 적어주세요!' : '가장 먼저 응원의 댓글을 적어주세요!';

  // input에 적으면 img변경
  const isTyping = commentInput.trimStart().length === 0 ? 'off' : 'on';

  useEffect(() => {
    console.log(inputToggle); // inputToggle이 변경될 때마다 호출됩니다.
  }, [inputToggle]);

  return (
    <CommentFormS onClick={handleFormClickFalse} inputToggle={inputToggle}>
      <input
        placeholder={placeholderText}
        value={commentInput}
        onChange={handleInputChange}
        type='text'
        maxLength={400}
      />
      <button onClick={handleFormClickTrue}>
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
