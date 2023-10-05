import { styled } from 'styled-components';
import { useState } from 'react';
import PostHeader from '../PostHeader';
import PostContent from './PostContent';
import { PostProps } from '../PostPropsType';

const GroupPost = ({ postProps }: { postProps: PostProps }): JSX.Element => {
  const [edit, setEdit] = useState<boolean>(false);
  const editbind = {
    edit,
    setEdit,
  };
  const { postData } = postProps;

  return (
    <GroupPostS>
      <PostHeader setEdit={setEdit} postProps={postProps} />
      {postData.image !== '' && (
        <PostImageS>
          <img src={postData.image} alt='업로드 사진' />
        </PostImageS>
      )}
      <PostContent editbind={editbind} postProps={postProps} />
    </GroupPostS>
  );
};

export default GroupPost;

const GroupPostS = styled.div`
  margin: 0 1rem;
  background-color: var(--color-bg);
  border-radius: 0.625rem;

  h2 {
    margin-bottom: var(--height-gap);
  }
`;

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
