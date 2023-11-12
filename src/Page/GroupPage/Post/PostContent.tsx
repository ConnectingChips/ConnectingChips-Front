import { styled } from 'styled-components';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { BoardsType, putEditBoard } from '../../../API/Boards';
import { refreshState } from '../../../data/initialData';

interface PostContentProps {
  isContentEditBind: {
    isContentEdit: boolean;
    setIsContentEdit: React.Dispatch<React.SetStateAction<boolean>>;
  };
  postData: BoardsType;
}

/** 2023-08-22 GroupActive.tsx - 작심 인증 글 내용 */
const PostContent = ({ isContentEditBind, postData }: PostContentProps): JSX.Element => {
  const { content, boardId } = postData;
  const { isContentEdit, setIsContentEdit } = isContentEditBind;
  const [contentText, setContentText] = useState(content);
  const textarea = useRef<HTMLTextAreaElement | null>(null);
  const [refresh, setRefresh] = useRecoilState<number>(refreshState);

  useEffect(() => {
    setContentText(content);
  }, [content]);

  // textarea에 글자적으면 자동 height변경
  const handleResizeHeight = useCallback(() => {
    if (textarea.current) {
      textarea.current.style.height = 'auto';
      textarea.current.style.height = `${textarea.current.scrollHeight}px`;
    }
  }, []);

  // 게시글 수정 핸들러
  const ContentEditHandler = async () => {
    await putEditBoard(boardId, {
      content: contentText,
    }).then((res) => {
      setContentText(res.content);
    });
    setRefresh(refresh + 1);
    setIsContentEdit(false);
  };

  return (
    <PostContentS>
      {isContentEdit ? (
        <>
          <TextareaS
            ref={textarea}
            onChange={(e) => {
              handleResizeHeight();
              setContentText(e.target.value);
            }}
            rows={2}
            placeholder='인증글을 입력해주세요.'
            maxLength={800}
            value={contentText}
          />
          <BtnContainerS>
            <button
              onClick={() => {
                setIsContentEdit(false);
              }}
            >
              취소
            </button>
            <button onClick={ContentEditHandler}>확인</button>
          </BtnContainerS>
        </>
      ) : (
        <p className='post'>{content}</p>
      )}
    </PostContentS>
  );
};

export default PostContent;

const PostContentS = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  textarea {
    background-color: white;
    border-radius: 1rem;
    resize: none;
    stroke: var(--color-disabled2);
  }
  p {
    color: var(--font-color2);
    font-size: var(--body-b);
  }
`;

const TextareaS = styled.textarea`
  border: 1px solid #e5e5ec;
  outline: none;
  margin-bottom: 0.5rem;
  &:last-child {
    margin-bottom: 0;
  }
`;

const BtnContainerS = styled.div`
  text-align: right;
  font-size: var(--button-mid);
  button {
    width: 4.25rem;
    height: 2rem;
    border: 1px solid var(--color-main);
    border-radius: 1.25rem;
    background-color: white;
  }
  button:nth-child(2) {
    background-color: var(--color-main);
    margin-left: 0.5rem;
  }
`;
