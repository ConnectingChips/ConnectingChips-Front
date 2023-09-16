import postInfoData from '../../data/postInfoData';
import { useState } from 'react';
import { CommentHeader } from './CommentHeader';
import { CommentList } from './CommentList';
import { CommentInput } from './CommentInput';

/** 2023-08-25 Comment.tsx - 그룹페이지 댓글 */
const Comment = ({ Commented }: { Commented: boolean }) => {
  const commentList = postInfoData.commentList;
  const [commentFlip, setCommentFlip] = useState(true);
  const [inputToggle, setInputToggle] = useState<boolean>(true);
  const [commentInput, setCommentInput] = useState<string>('');
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
  return (
    <>
      {commentList.length > 0 ? (
        <>
          <CommentHeader commentFlipBind={commentFlipBind} />
          <CommentList commentFlipBind={commentFlipBind} />
        </>
      ) : null}
      <CommentInput commentInputBind={commentInputBind} inputToggleBind={inputToggleBind} />
    </>
  );
};

export default Comment;
