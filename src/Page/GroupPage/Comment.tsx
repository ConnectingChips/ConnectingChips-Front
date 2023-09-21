import { useState } from 'react';
import { CommentHeader } from './CommentHeader';
import { CommentList } from './CommentList';
import { CommentInput } from './CommentInput';
import { CommentType, BoardsType } from '../../API/Boards';
import { GetUser } from '../../Type/User';

interface CommentListDataProps {
  postData: BoardsType;
  userInfo: GetUser;
  refreshBind: {
    refresh: number;
    setRefresh: React.Dispatch<React.SetStateAction<number>>;
  };
}

const Comment = ({ postData, userInfo, refreshBind }: CommentListDataProps) => {
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

  return (
    <>
      {postData.commentCount > 0 ? (
        <>
          <CommentHeader commentFlipBind={commentFlipBind} postData={postData} />
          <CommentList
            commentFlipBind={commentFlipBind}
            inputToggleBind={inputToggleBind}
            isCommentBind={isCommentBind}
            commentListData={postData.commentList}
            userInfo={userInfo}
            refreshBind={refreshBind}
          />
        </>
      ) : null}
      <CommentInput
        commentInputBind={commentInputBind}
        inputToggleBind={inputToggleBind}
        isCommentBind={isCommentBind}
        postData={postData}
        userInfo={userInfo}
        refreshBind={refreshBind}
      />
    </>
  );
};

export default Comment;
