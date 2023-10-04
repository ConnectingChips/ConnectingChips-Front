import { styled } from 'styled-components';
import { useState } from 'react';
import { PostProps } from './PostPropsType';
import { CommentHeader } from './CommentHeader';
import { CommentInput } from './CommentInput';
import CommentBoxMaker from './CommentList';

const Comment = ({ postProps }: { postProps: PostProps }): JSX.Element => {
  // 댓글접기
  const [commentFlip, setCommentFlip] = useState(true);
  // input 바텀에 붙거나 말거나
  const [inputToggle, setInputToggle] = useState<boolean>(true);
  // input 내용 받아오기
  const [commentInput, setCommentInput] = useState<string>('');
  // 댓글과 답글 구분
  const [isComment, setIsComment] = useState<number>(0);
  const commentFlipBind = {
    commentFlip,
    setCommentFlip,
  };
  const inputToggleBind = {
    inputToggle,
    setInputToggle,
  };
  const commentInputBind = {
    commentInput,
    setCommentInput,
  };
  const isCommentBind = {
    isComment,
    setIsComment,
  };

  const { postData, userInfo } = postProps;

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
      <CommentInput
        commentInputBind={commentInputBind}
        inputToggleBind={inputToggleBind}
        isCommentBind={isCommentBind}
        postData={postData}
        userInfo={userInfo}
        setCommentFlip={setCommentFlip}
      />
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