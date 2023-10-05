import { useState } from 'react';

const useCommentInput = () => {
  // 댓글접기
  const [commentFlip, setCommentFlip] = useState(true);
  const commentFlipBind = {
    commentFlip,
    setCommentFlip,
  };

  // input 바텀에 붙거나 말거나
  const [inputToggle, setInputToggle] = useState<boolean>(true);

  // 댓글과 답글 구분
  const [isComment, setIsComment] = useState<number>(0);

  const isCommentBind = {
    isComment,
    setIsComment,
  };

  // input 바깥쪽누르면 되돌아감
  const handleFormClickTrue = () => {
    !inputToggle && setInputToggle(true);
    setIsComment(0);
  };

  // input 내용 받아오기
  const [commentInput, setCommentInput] = useState<string>('');

  const inputToggleBind = {
    inputToggle,
    setInputToggle,
  };
  const commentInputBind = {
    commentInput,
    setCommentInput,
  };

  // input에 들어갈 내용 CommentInput에 넣는 함수
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentInput(e.target.value);
  };

  // 댓글에 붙은 input누르면 하단에 붙음
  const handleFormClickFalse = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    inputToggle && setInputToggle(false);
  };

  return {
    isCommentBind,
    commentFlipBind,
    inputToggleBind,
    commentInputBind,
    handleFormClickTrue,
    handleInputChange,
    handleFormClickFalse,
  };
};

export default useCommentInput;
