import { styled } from 'styled-components';
import { useCallback, useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { putEditBoard } from '../../../API/Boards';
import { refreshState } from '../../../data/initialData';
import { PostProps } from '../PostPropsType';

interface PostContentProps {
  editbind: { edit: boolean; setEdit: React.Dispatch<React.SetStateAction<boolean>> };
  postProps: PostProps;
}

/** 2023-08-22 GroupActive.tsx - 작심 인증 글 내용 */
const PostContent = ({ editbind, postProps }: PostContentProps): JSX.Element => {
  const { mindId } = useParams();
  const { postData } = postProps;
  const { content, boardId } = postData;
  const { edit, setEdit } = editbind;
  const [editContent, setEditContent] = useState(content);
  const [imgCheck, setImgCheck] = useState(true);
  const textarea = useRef<HTMLTextAreaElement | null>(null);
  const [refresh, setRefresh] = useRecoilState<number>(refreshState);

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
          <TextareaS
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
          </TextareaS>
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

const TextareaS = styled.textarea`
  border: 1px solid #e5e5ec;
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

const PostContentS = styled.div<{ imgCheck: boolean }>`
  padding: ${(props) => (props.imgCheck === true ? '0 1rem 1rem 1rem' : '1rem')};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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
