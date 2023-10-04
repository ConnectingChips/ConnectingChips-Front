import { styled, useRecoilState } from './CommentBarrel';
import type { BoardsType, GetUser } from './CommentBarrel';
import { postAddComment, postAddReply, refreshState } from './CommentBarrel';

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
  setCommentFlip: React.Dispatch<React.SetStateAction<boolean>>;
}

const CommentInput = ({
  commentInputBind,
  inputToggleBind,
  isCommentBind,
  postData,
  userInfo,
  setCommentFlip,
}: commentInputProps) => {
  const { commentInput, setCommentInput } = commentInputBind;
  const { inputToggle, setInputToggle } = inputToggleBind;
  const { isComment, setIsComment } = isCommentBind;
  const [refresh, setRefresh] = useRecoilState<number>(refreshState);

  const getPlaceholderText = (isComment: number, commentCount: number) => {
    if (isComment !== 0) return '답글을 적어주세요';
    return commentCount > 0 ? '응원의 댓글을 적어주세요!' : '가장 먼저 응원의 댓글을 적어주세요!';
  };

  const placeholderText = getPlaceholderText(isComment, postData.commentCount);

  // input에 들어갈 내용 CommentInput에 넣는 함수
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentInput(e.target.value);
  };

  // 댓글에 붙은 input누르면 하단에 붙음
  const handleFormClickFalse = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    inputToggle && setInputToggle(false);
  };

  // input 바깥쪽누르면 되돌아감
  const handleFormClickTrue = () => {
    !inputToggle && setInputToggle(true);
    setIsComment(0);
  };

  // input 버튼 핸들러
  // 0이면 댓글추가
  // 0이아니면 답글추가인데 여기에 들어가는 숫자는 답글이 붙을 댓글의 id (commentid)
  const inputBtnHandler = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setInputToggle(true);
    if (commentInput.length === 0) return;
    try {
      if (isComment === 0) {
        const AddCommentData = {
          userId: userInfo.userId,
          boardId: postData.boardId,
          content: commentInput,
        };
        await postAddComment(AddCommentData);
      } else {
        const AddReplyData = {
          userId: userInfo.userId,
          commentId: isComment,
          content: commentInput,
        };
        await postAddReply(AddReplyData);
        setIsComment(0);
      }
      setCommentInput('');
      setCommentFlip(false);
      setRefresh((prevRefresh) => prevRefresh + 1);
    } catch (error) {
      console.error('오류 발생:', error);
    }
  };

  // input에 글 적으면 화살표 노란색으로 변경
  const isTyping = commentInput.trimStart().length === 0 ? 'off' : 'on';

  const CommentForm = () => {
    return (
      <CommentFormS inputToggle={inputToggle} onClick={handleFormClickFalse}>
        <InputS inputToggle={inputToggle}>
          <input
            placeholder={placeholderText}
            value={commentInput}
            onChange={handleInputChange}
            type='text'
            maxLength={400}
          />
          <button onClick={inputBtnHandler}>
            {
              <img
                src={`${process.env.PUBLIC_URL}/commentInputButton${isTyping}.svg`}
                alt='sendIcon'
              />
            }
          </button>
        </InputS>
      </CommentFormS>
    );
  };
  return inputToggle ? (
    <CommentForm />
  ) : (
    <CommentFormBGS inputToggle={inputToggle} onClick={handleFormClickTrue}>
      <CommentForm />
    </CommentFormBGS>
  );
};

export { CommentInput };

const CommentFormBGS = styled.div<{ inputToggle: boolean }>`
  ${(props) =>
    props.inputToggle
      ? ''
      : 'position: fixed; display: flex; flex-direction: column-reverse; top: 0;left: 0;right: 0;bottom: 0;z-index: 100;overflow:auto;'}
`;

const CommentFormS = styled.div<{ inputToggle: boolean }>`
  position: ${(props) => (props.inputToggle ? '' : 'fixed')};
  display: flex;
  justify-content: center;
  align-items: center;
  position: static;
  width: 100%;
  background-color: white;
  height: 4.5rem;
  padding: ${(props) => (props.inputToggle ? '0.5rem 0' : '')};
`;

const InputS = styled.div<{ inputToggle: boolean }>`
  position: ${(props) => (props.inputToggle ? '' : 'fixed')};
  background-color: #fff;
  border: 1px solid #e3e3e3;
  border-radius: 0.5rem;
  width: 100%;
  box-sizing: border-box;
  padding: 1.06rem 1rem;
  display: flex;
  align-items: center;
  justify-content: ${(props) => (props.inputToggle ? 'center' : 'space-around')};
  z-index: 10;
  input {
    font-size: 1rem;
    flex: 1;
    height: 1.25rem;
    border: none;
    background-color: transparent;
    color: var(--font-color3);
  }
  button {
    padding: 0;
  }
`;
