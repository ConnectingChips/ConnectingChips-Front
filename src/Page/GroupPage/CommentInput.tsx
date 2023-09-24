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
  commentFlipBind: {
    commentFlip: boolean;
    setCommentFlip: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

const CommentInput = ({
  commentInputBind,
  inputToggleBind,
  isCommentBind,
  postData,
  userInfo,
  refreshBind,
  commentFlipBind,
}: commentInputProps) => {
  const { commentInput, setCommentInput } = commentInputBind;
  const { inputToggle, setInputToggle } = inputToggleBind;
  const { isComment, setIsComment } = isCommentBind;
  const { commentFlip, setCommentFlip } = commentFlipBind;
  const { setRefresh } = refreshBind;

  const getPlaceholderText = (isComment: number, commentCount: number) => {
    if (isComment !== 0) return '답글';
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

  return (
    <CommentFormBGS inputToggle={inputToggle} onClick={handleFormClickTrue}>
      <CommentFormS onClick={handleFormClickFalse} inputToggle={inputToggle}>
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
    </CommentFormBGS>
  );
};

export { CommentInput };

const CommentFormBGS = styled.div<{ inputToggle: boolean }>`
  ${(props) =>
    props.inputToggle
      ? ''
      : 'position: fixed;display: flex;justify-content: center;align-items: center;top: 0;left: 0;right: 0;bottom: 0;z-index: 100;overflow:auto;'}
`;

const CommentFormS = styled.div<{ inputToggle: boolean }>`
  position: ${(props) => (props.inputToggle ? 'static' : 'fixed')};
  width: 100%;
  height: 4.5rem;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

const InputS = styled.div<{ inputToggle: boolean }>`
  font-size: 1rem;
  position: ${(props) => (props.inputToggle ? 'static' : 'fixed')};
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
