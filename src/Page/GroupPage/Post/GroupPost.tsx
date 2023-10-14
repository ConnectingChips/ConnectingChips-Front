import { styled } from 'styled-components';
import { useState } from 'react';
import PostHeader from './PostHeader';
import PostContent from './PostContent';
import { PostProps } from '../PostPropsType';

const GroupPost = ({ postProps }: { postProps: PostProps }): JSX.Element => {
  const [toggleContentEdit, setToggleContentEdit] = useState<boolean>(false);
  const toggleContentEditbind = {
    toggleContentEdit,
    setToggleContentEdit,
  };
  const { postData } = postProps;

  return (
    <GroupPostS>
      <PostHeader setToggleContentEdit={setToggleContentEdit} postProps={postProps} />
      <PostImageS src={postData.image} alt='업로드 사진' />
      <PostContent toggleContentEditbind={toggleContentEditbind} postProps={postProps} />
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

const PostImageS = styled.img`
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
`;
