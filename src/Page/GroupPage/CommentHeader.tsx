import { styled } from 'styled-components';
import Arrow_icon_Up from '../../image/Icon/Arrow/Arrow_icon_Up.svg';
import Arrow_icon_Down from '../../image/Icon/Arrow/Arrow_icon_Down.svg';
import { BoardsType } from '../../API/Boards';
interface CommentHeaderProps {
  commentFlipBind: {
    commentFlip: boolean;
    setCommentFlip: React.Dispatch<React.SetStateAction<boolean>>;
  };
  postData: BoardsType;
}

const CommentHeader = ({ commentFlipBind, postData }: CommentHeaderProps) => {
  const { commentFlip, setCommentFlip } = commentFlipBind;
  return (
    <CommentHeaderS>
      <h2>댓글 {postData.commentCount}</h2>
      <div onClick={() => setCommentFlip(!commentFlip)}>
        {commentFlip ? (
          <img style={{ paddingTop: '5px' }} src={Arrow_icon_Down} alt='댓글열기' />
        ) : (
          <img src={Arrow_icon_Up} alt='댓글접기' />
        )}
      </div>
    </CommentHeaderS>
  );
};

// TOFIX: export defalut 왜 안돼
export { CommentHeader };

const CommentHeaderS = styled.div`
  margin: 0.75rem 0;
  display: flex;
  gap: 0.5rem;
`;
