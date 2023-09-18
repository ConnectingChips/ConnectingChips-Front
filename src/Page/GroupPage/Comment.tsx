import { useState } from 'react';
import { CommentHeader } from './CommentHeader';
import { CommentList } from './CommentList';
import { CommentInput } from './CommentInput';
import { CommentType } from '../../API/Boards';

interface CommentListDataProps {
  commentListData: CommentType[];
}

const Comment = ({ commentListData }: CommentListDataProps) => {
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
      {commentListData.length > 0 ? (
        <>
          <CommentHeader commentFlipBind={commentFlipBind} commentListData={commentListData} />
          <CommentList commentFlipBind={commentFlipBind} commentListData={commentListData} />
        </>
      ) : null}
      <CommentInput commentInputBind={commentInputBind} inputToggleBind={inputToggleBind} />
    </>
  );
};

export default Comment;
