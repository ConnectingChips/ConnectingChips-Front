import styled from 'styled-components';
import { PostProps } from '../PostPropsType';
import { CommentHeader } from './CommentHeader';
import { CommentInput } from './CommentInput';
import CommentBoxMaker from './CommentList';
import useCommentInput from '../../../API/useCommentInput';

const Comment = ({ postProps }: { postProps: PostProps }): JSX.Element => {
  const { commentFlipBind, inputToggleBind, isCommentBind } = useCommentInput();
  const { postData, userInfo } = postProps;

  const { commentFlip, setCommentFlip } = commentFlipBind;
  const { setInputToggle } = inputToggleBind;
  const { setIsComment } = isCommentBind;

  return (
    <CommentContainerS>
      {postData.commentCount > 0 && (
        <>
          <CommentHeader commentFlipBind={commentFlipBind} postData={postData} />
          <CommentListS commentFlip={commentFlip}>
            {postData.commentList.map((commentData, i) => (
              <CommentBoxMaker
                setInputToggle={setInputToggle}
                setIsComment={setIsComment}
                commentData={commentData}
                userInfo={userInfo}
                key={i}
              />
            ))}
          </CommentListS>
        </>
      )}
      <CommentInput postData={postData} userInfo={userInfo} setCommentFlip={setCommentFlip} />
    </CommentContainerS>
  );
};

export default Comment;

const CommentContainerS = styled.div`
  margin: 0 1rem;
  margin-top: 0.5rem;
`;

const CommentListS = styled.div<{ commentFlip: boolean }>`
  height: ${(props) => (props.commentFlip ? '0px' : 'auto')};
  margin: ${(props) => (props.commentFlip ? 'none' : '1rem 0')};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
