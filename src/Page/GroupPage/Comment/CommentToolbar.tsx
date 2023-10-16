import styled from 'styled-components';
import {
  Arrow_Up as Arrow_icon_Down,
  Arrow_Down as Arrow_icon_Up,
} from '../../../Component/ArrowBarrel';
import { BoardsType } from '../GroupPageBarrel';
import Bind from '../../../Type/Bind';
interface CommentToolbarProps {
  postData: BoardsType;
}

const CommentToolbar = ({ postData }: CommentToolbarProps) => {
  return (
    <CommentToolbarS>
      <h2 className='commentfont'>댓글 {postData.commentCount}</h2>
    </CommentToolbarS>
  );
};

// TOFIX: export defalut 왜 안돼
export { CommentToolbar };

const CommentToolbarS = styled.div`
  display: flex;
  gap: 0.5rem;
  .commentfont {
    font-size: 1rem;
  }
`;
