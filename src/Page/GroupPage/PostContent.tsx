import { styled } from 'styled-components';
import postInfoData from '../../data/postInfoData';
import { likeIcon, likeFill, commentIcon } from '../../Component/Like_CommentBarrel';
import LikeBind from '../../Type/LikeBind';
import { useEffect, useRef } from 'react';

interface PostContentProps {
  setCommented: React.Dispatch<React.SetStateAction<boolean>>;
  editbind: { edit: boolean; setEdit: React.Dispatch<React.SetStateAction<boolean>> };
}

/** 2023-08-22 GroupActive.tsx - 작심 인증 글 내용 */
const PostContent = ({ setCommented, editbind }: PostContentProps): JSX.Element => {
  const { edit, setEdit } = editbind;
  const maxCharacterCount = 800; // 원하는 최대 글자수

  const textarea = useRef<HTMLTextAreaElement | null>(null);

  const handleResizeHeight = () => {
    if (textarea.current) {
      textarea.current.style.height = 'auto';
      textarea.current.style.height = textarea.current.scrollHeight + 'px';
    }
  };

  useEffect(() => {}, [edit]);

  return (
    <PostContentS>
      {edit ? (
        <>
          <textarea
            ref={textarea}
            onChange={handleResizeHeight}
            rows={2} // 기본 높이 설정
            placeholder='인증글을 입력해주세요.'
            maxLength={maxCharacterCount}
          >
            {postInfoData.postText}
          </textarea>
          <CheckBtn editbind={editbind} />
        </>
      ) : (
        <p className='post'>{postInfoData.postText}</p>
      )}
    </PostContentS>
  );
};

export default PostContent;

interface CheckBtnProps {
  editbind: { edit: boolean; setEdit: React.Dispatch<React.SetStateAction<boolean>> };
}

const CheckBtn = ({ editbind }: CheckBtnProps): JSX.Element => {
  const { edit, setEdit } = editbind;
  return (
    <BtnContainerS>
      <button
        onClick={() => {
          setEdit(false);
        }}
      >
        취소
      </button>
      <button
        onClick={() => {
          setEdit(false);
        }}
      >
        확인
      </button>
    </BtnContainerS>
  );
};

const BtnContainerS = styled.div`
  text-align: right;
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
