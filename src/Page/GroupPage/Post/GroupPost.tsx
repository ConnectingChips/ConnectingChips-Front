import { styled } from 'styled-components';
import { useState } from 'react';
import PostHeader from './PostHeader';
import PostContent from './PostContent';
import { PostProps } from '../PostPropsType';
import comment_icon from '../../../image/Icon/comment_icon.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { isCommentInputFocused } from '../../../data/initialData';

const GroupPost = ({
  postProps,
  sort,
}: {
  postProps: PostProps;
  sort: 'groupPage' | 'commentPage';
}): JSX.Element => {
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
      {sort === 'groupPage' ? (
        <>
          <CommentOptionsBar postProps={postProps} />
          <CommentPreview postProps={postProps} />
          <CommentInputBar postProps={postProps} />
        </>
      ) : (
        <></>
      )}
    </GroupPostS>
  );
};

export default GroupPost;

const CommentOptionsBar = ({ postProps }: { postProps: PostProps }) => {
  const navigate = useNavigate();
  const { mindId } = useParams();
  const { boardId } = postProps.postData;
  const navigateCommentsPage = () => {
    navigate(`/grouppage/${mindId}/${boardId}`);
  };
  return (
    <CommentOptionsBarS>
      <img src={comment_icon} alt='comment-icon' onClick={navigateCommentsPage}></img>
      <div onClick={navigateCommentsPage}>댓글 {postProps.postData.commentCount}</div>
    </CommentOptionsBarS>
  );
};

const CommentPreview = ({ postProps }: { postProps: PostProps }) => {
  const { commentList } = postProps.postData;
  const lastComment = commentList[commentList.length - 1];
  if (!commentList.length) return null;
  return (
    <CommentPreviewS>
      <img src={lastComment.profileImage} alt='profileImage' />
      <div className='nickname'>{lastComment.nickname}</div>
      <div className='content'>{lastComment.content}</div>
    </CommentPreviewS>
  );
};

const CommentInputBar = ({ postProps }: { postProps: PostProps }) => {
  const navigate = useNavigate();
  const { mindId } = useParams();
  const { boardId } = postProps.postData;
  const [isInputFocused, setIsInputFocused] = useRecoilState(isCommentInputFocused);
  const navigateCommentsPage = () => {
    navigate(`/grouppage/${mindId}/${boardId}`);
    setIsInputFocused(true);
  };

  const commentInputText = () => {
    if (postProps.postData.commentCount === 0) {
      return '가장 먼저 응원의 댓글을 적어주세요!';
    } else {
      return '응원의 댓글을 적어주세요!';
    }
  };

  return (
    <CommentInputBarContainer>
      <CommentInputBarS onClick={navigateCommentsPage}>
        <div>{commentInputText()}</div>
        <img src={`${process.env.PUBLIC_URL}/commentInputButtonoff.svg`} alt='sendIcon' />
      </CommentInputBarS>
    </CommentInputBarContainer>
  );
};

const GroupPostS = styled.div`
  margin: 0 1rem;
  background-color: var(--color-white);
  border-radius: 0.625rem;
  border: 1px solid var(--color-line);
  h2 {
    margin-bottom: var(--height-gap);
  }
`;

export const PostImageS = styled.img`
  width: 100%;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: cover;
`;

const CommentOptionsBarS = styled.div`
  position: relative;
  height: 2.5rem;
  background-color: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: 1px;
    background-color: var(--color-line);
  }

  &::before {
    top: 0;
  }

  &::after {
    bottom: 0;
  }

  img {
    width: 1.25rem;
    height: 1.25rem;
  }
  div {
    font-size: 0.75rem;
    color: var(--font-color3);
  }
`;

const CommentPreviewS = styled.div`
  display: flex;
  align-items: center;
  height: 1.5rem;
  margin: 0.62rem 1rem 0 1rem;
  font-size: 0.875rem;

  img {
    height: 1.5rem;
    margin-right: 0.56rem;
  }
  .nickname {
    margin-right: 0.25rem;
    font-weight: 500;
    white-space: nowrap;
  }
  .content {
    color: var(--font-color3);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const CommentInputBarContainer = styled.div`
  height: 4.5rem;
`;

const CommentInputBarS = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-bg);
  padding: 1.06rem 1rem;
  border: 1px solid #e3e3e3;
  border-radius: 0.5rem;
  margin: 0.5rem 0.91rem;
  font-size: 1rem;
  color: var(--font-color3);
`;
