import { useState } from 'react';
import { CommentHeader } from './CommentHeader';
import { CommentList } from './CommentList';
import { CommentInput } from './CommentInput';
import { CommentType, BoardsType } from '../../API/Boards';

interface CommentListDataProps {
  postData: BoardsType;
}

const Comment = ({ postData }: CommentListDataProps) => {
  const [commentFlip, setCommentFlip] = useState(true);
  // input 바텀에 붙거나 말거나
  const [inputToggle, setInputToggle] = useState<boolean>(true);
  // input 내용 받아오기
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
      {postData.commentCount > 0 ? (
        <>
          <CommentHeader commentFlipBind={commentFlipBind} postData={postData} />
          <CommentList commentFlipBind={commentFlipBind} commentListData={postData.commentList} />
        </>
      ) : null}
      <CommentInput
        commentInputBind={commentInputBind}
        inputToggleBind={inputToggleBind}
        postData={postData}
      />
    </>
  );
};

export default Comment;
