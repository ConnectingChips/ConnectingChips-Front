import { styled } from 'styled-components';
import postInfoData from '../../data/postInfoData';
import Arrow_icon_Up from '../../image/Icon/Arrow/Arrow_icon_Up.svg';
import Arrow_icon_Down from '../../image/Icon/Arrow/Arrow_icon_Down.svg';

interface CommentHeaderProps {
  commentFlipBind: {
    commentFlip: boolean;
    setCommentFlip: React.Dispatch<React.SetStateAction<boolean>>;
  };
}

const CommentHeader = ({ commentFlipBind }: CommentHeaderProps) => {
  const commentList = postInfoData.commentList;
  const { commentFlip, setCommentFlip } = commentFlipBind;
  return (
    <CommentHeaderS>
      <h2>댓글 {commentList.length}</h2>
      {/* TODO: api로 댓글 개수 가져오기 */}
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
  display: flex;
  gap: 0.5rem;
`;
