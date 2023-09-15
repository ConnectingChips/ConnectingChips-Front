import { styled } from 'styled-components';
import postInfoData from '../../data/postInfoData';

interface commentInputProps {
  commentInputBind: {
    commentInput: string;
    setCommentInput: React.Dispatch<React.SetStateAction<string>>;
  };
  inputToggleBind: {
    inputToggle: boolean;
    setInputToggle: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

const CommentInput = ({ commentInputBind, inputToggleBind }: commentInputProps) => {
  const commentList = postInfoData.commentList;
  const { commentInput, setCommentInput } = commentInputBind;
  const { inputToggle, setInputToggle } = inputToggleBind;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentInput(e.target.value);
  };

  return (
    <>
      {inputToggle ? (
        <FakeCommentFormS
          onClick={() => {
            setInputToggle(false);
          }}
        >
          <p>
            {commentList.length > 0
              ? '응원의 댓글을 적어주세요!'
              : '가장 먼저 응원의 댓글을 적어주세요!'}
          </p>
          <button>
            <img src={`${process.env.PUBLIC_URL}/commentInputButtonOFF.svg`} alt='sendIcon' />
          </button>
        </FakeCommentFormS>
      ) : (
        <CommentFormS>
          <input
            placeholder={
              commentList.length > 0
                ? '응원의 댓글을 적어주세요!'
                : '가장 먼저 응원의 댓글을 적어주세요!'
            }
            value={commentInput}
            onChange={handleInputChange}
            type='text'
            maxLength={400}
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              setInputToggle(true);
            }}
          >
            {commentInput.trimStart().length === 0 ? (
              <img src={`${process.env.PUBLIC_URL}/commentInputButtonOFF.svg`} alt='sendIcon' />
            ) : (
              <img src={`${process.env.PUBLIC_URL}/commentInputButtonON.svg`} alt='sendIcon' />
            )}
          </button>
        </CommentFormS>
      )}
    </>
  );
};

export { CommentInput };

const FakeCommentFormS = styled.div`
  background-color: #fff;
  border: 1px solid #e3e3e3;
  border-radius: 0.5rem;
  height: 3.5rem;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  z-index: 10;
  margin: 0.5rem 0 0.5rem 0;
  p {
    width: 16.6rem;
    height: 1.25rem;
    border: none;
    background-color: transparent;
    font-size: 0.8rem;
    color: var(--font-color3);
  }
`;

/** 2023-08-25 Comment.tsx - 그룹페이지 댓글 입력 창 */
const CommentFormS = styled.form`
  position: fixed;
  bottom: 0;
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
