import { styled } from 'styled-components';
import { useCallback, useEffect, useRef, useState } from 'react';
import { BoardsType, putEditBoard } from '../../API/Boards';
import { useParams } from 'react-router-dom';
interface PostContentProps {
  editbind: { edit: boolean; setEdit: React.Dispatch<React.SetStateAction<boolean>> };
  postData: BoardsType;
  refreshBind: {
    refresh: number;
    setRefresh: React.Dispatch<React.SetStateAction<number>>;
  };
}

/** 2023-08-22 GroupActive.tsx - 작심 인증 글 내용 */
const PostContent = ({ editbind, postData, refreshBind }: PostContentProps): JSX.Element => {
  const { mindId } = useParams();
  const { content, boardId } = postData;
  const { edit, setEdit } = editbind;
  const { refresh, setRefresh } = refreshBind;
  const [editContent, setEditContent] = useState(content);
  const [imgCheck, setImgCheck] = useState(true);
  const textarea = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    if (postData.image !== '') setImgCheck(false);
  }, [refresh]);

  // textarea에 글자적으면 자동 height변경
  const handleResizeHeight = useCallback(() => {
    if (textarea.current) {
      textarea.current.style.height = 'auto';
      textarea.current.style.height = `${textarea.current.scrollHeight}px`;
    }
  }, []);

  if (typeof mindId === 'undefined') return <></>;

  const postEditData: {
    content: string;
  } = {
    content: editContent,
  };

  // 게시글 수정
  const EditReq = async () => {
    await putEditBoard(boardId, postEditData).then((res) => {
      setEditContent(res.content);
    });
    setRefresh(refresh + 1);
    setEdit(false);
  };
  return (
    <PostContentS imgCheck={imgCheck}>
      {edit ? (
        <>
          <textarea
            ref={textarea}
            onChange={(e) => {
              handleResizeHeight();
              setEditContent(e.target.value);
            }}
            rows={2}
            placeholder='인증글을 입력해주세요.'
            maxLength={800}
            value={editContent}
          >
            {content}
          </textarea>
          <BtnContainerS>
            <button
              onClick={() => {
                setEdit(false);
              }}
            >
              취소
            </button>
            <button onClick={EditReq}>확인</button>
          </BtnContainerS>
        </>
      ) : (
        <p className='post'>{content}</p>
      )}
    </PostContentS>
  );
};

export default PostContent;

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

const PostContentS = styled.div<{ imgCheck: boolean }>`
  padding: ${(props) => (props.imgCheck === true ? '0 1rem 1rem 1rem;' : '1rem;')}
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 0.5rem;
  textarea {
    background-color: white;
    border-radius: 1rem;
    resize: none;
    stroke: var(--color-disabled2);
  }
  p {
    color: var(--font-color2);
    font-size: 0.875rem;
  }
`;
