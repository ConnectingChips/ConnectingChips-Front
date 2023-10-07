import styled from 'styled-components';
import { useState } from 'react';
import { PostProps } from '../PostPropsType';
import { CommentToolbar } from './CommentToolbar';
import { CommentInput } from './CommentInput';
import CommentBoxMaker from './CommentBoxMaker';
import Bind from '../../../Type/Bind';

const CommentList = ({ postProps }: { postProps: PostProps }): JSX.Element => {
  const { postData, userInfo } = postProps;

  // 댓글접기
  const [commentFlip, setCommentFlip] = useState(true);
  const commentFlipBind: Bind<boolean> = { state: commentFlip, Setter: setCommentFlip };

  // input 바텀에 붙거나 말거나
  const [inputToggle, setInputToggle] = useState<boolean>(true);
  const inputToggleBind: Bind<boolean> = { state: inputToggle, Setter: setInputToggle };

  // 0이면 댓글 아니면 댓글의 commentId로 답글만들기
  const [isComment, setIsComment] = useState<number>(0);
  const isCommentBind: Bind<number> = { state: isComment, Setter: setIsComment };

  return (
    <CommentListContainerS>
      {postData.commentCount > 0 && (
        <>
          <CommentToolbar postData={postData} commentFlipBind={commentFlipBind} />
          <CommentListS commentFlip={commentFlip}>
            {postData.commentList.map((commentData) => (
              <CommentBoxMaker
                userInfo={userInfo}
                setInputToggle={setInputToggle}
                setIsComment={setIsComment}
                commentData={commentData}
                key={commentData.commentId}
              />
            ))}
          </CommentListS>
        </>
      )}
      <CommentInput
        postData={postData}
        userInfo={userInfo}
        setCommentFlip={setCommentFlip}
        inputToggleBind={inputToggleBind}
        isCommentBind={isCommentBind}
      />
    </CommentListContainerS>
  );
};

export default CommentList;

const CommentListContainerS = styled.div`
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
