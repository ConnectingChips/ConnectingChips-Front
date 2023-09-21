import { styled } from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import { BoardsType, putEditBoard } from '../../API/Boards';
import { useParams } from 'react-router-dom';
import { GetUser } from '../../Type/User';
interface PostContentProps {
  editbind: { edit: boolean; setEdit: React.Dispatch<React.SetStateAction<boolean>> };
  postData: BoardsType;
  userInfo: GetUser;
}

/** 2023-08-22 GroupActive.tsx - 작심 인증 글 내용 */
const PostContent = ({ editbind, postData, userInfo }: PostContentProps): JSX.Element => {
  const { edit, setEdit } = editbind;
  const [editContent, setEditContent] = useState(postData.content);
  const textarea = useRef<HTMLTextAreaElement | null>(null);
  let { mindId } = useParams();

  // textarea에 글자적으면 자동 height변경
  const handleResizeHeight = () => {
    if (textarea.current) {
      textarea.current.style.height = 'auto';
      textarea.current.style.height = textarea.current.scrollHeight + 'px';
    }
  };

  if (typeof mindId === 'undefined') return <></>;

  // const postEditData: {
  //   mindId: number;
  //   userId: number;
  //   content: string;
  //   image: string;
  // } = {
  //   mindId: Number(mindID),
  //   userId: userInfo.userId,
  //   content: editContent,
  //   image: postData.image,
  // };

  const postEditData: {
    content: string;
  } = {
    content: editContent,
  };

  const EditReq = () => {
    putEditBoard(postData.boardId, postEditData).then((res) => {
      setEditContent(res.content);
    });
  };

  return (
    <PostContentS>
      {edit ? (
        <>
          <textarea
            ref={textarea}
            onChange={(e) => {
              handleResizeHeight();
              setEditContent(e.target.value);
            }}
            rows={2} // 기본 높이 설정
            placeholder='인증글을 입력해주세요.'
            maxLength={800}
            value={editContent}
          >
            {postData.content}
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
        <p className='post'>{postData.content}</p>
      )}
    </PostContentS>
  );
};

export default PostContent;

const BtnContainerS = styled.div`
  text-align: right;
  button {
    font-size : var(--button-mid)
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

/** 2023-08-22 GroupActive.tsx - 그룹페이지 아티클 내용 */
const PostContentS = styled.div`
  padding: 1rem;
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
