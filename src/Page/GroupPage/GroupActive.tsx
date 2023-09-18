import { styled } from 'styled-components';
import { PageSort } from '../../Type/MissionType';
import PostHeader from './PostHeader';
import PostContent from './PostContent';
import { useState } from 'react';
import { BoardsType } from '../../API/Boards';

interface GroupActiveProps {
  passsort: PageSort;
  setCommented: React.Dispatch<React.SetStateAction<boolean>>;
  post: BoardsType;
}

/** 2023-08-22 GroupActive.tsx - 작심 인증 글 */
const GroupActive = ({ passsort, setCommented, post }: GroupActiveProps): JSX.Element => {
  const [edit, setEdit] = useState<boolean>(false);
  const editbind = {
    edit,
    setEdit,
  };

  return (
    <GroupActiveS passsort={passsort}>
      <PostS>
        {/* TODO: api시간가져오기 */}
        <PostHeader editbind={editbind} post={post} />
        <PostImageS>
          <img src={post.image} alt='업로드 사진' />
        </PostImageS>
        <PostContent setCommented={setCommented} editbind={editbind} post={post} />
      </PostS>
    </GroupActiveS>
  );
};

export default GroupActive;

/** 2023-08-22 GroupActive.tsx - 작심 인증 글 */
const GroupActiveS = styled.div<{ passsort: PageSort }>`
  margin: ${(props) => (props.passsort === 'Intro' ? '0 1rem 1rem 1rem' : null)};

  h2 {
    margin-bottom: var(--height-gap);
  }
`;

/** 2023-08-22 GroupActive.tsx - 그룹페이지 아티클 */
const PostS = styled.article`
  border-radius: 0.5rem;
  background-color: var(--color-bg);
`;

/** 2023-08-22 GroupActive.tsx - 그룹페이지 아티클 인증 이미지(임시) */
const PostImageS = styled.div`
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
  }
`;
