import styled from 'styled-components';
import {
  Arrow_Up as Arrow_icon_Down,
  Arrow_Down as Arrow_icon_Up,
} from '../../../Component/ArrowBarrel';
import { BoardsType } from '../GroupPageBarrel';
import Bind from '../../../Type/Bind';
interface CommentHeaderProps {
  commentFlipBind: Bind<boolean>;
  postData: BoardsType;
}

const CommentToolbar = ({ commentFlipBind, postData }: CommentHeaderProps) => {
  const { state: commentFlip, Setter: setCommentFlip } = commentFlipBind;
  return (
    <CommentHeaderS>
      <h2 className='commentfont'>댓글 {postData.commentCount}</h2>
      <img
        src={commentFlip ? Arrow_icon_Down : Arrow_icon_Up}
        alt='댓글열기'
        onClick={() => setCommentFlip(!commentFlip)}
      />
    </CommentHeaderS>
  );
};

// TOFIX: export defalut 왜 안돼
export { CommentToolbar };

const CommentHeaderS = styled.div`
  display: flex;
  gap: 0.5rem;
  .commentfont {
    font-size: 1rem;
  }
`;
