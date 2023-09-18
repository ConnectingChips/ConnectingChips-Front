import { styled } from 'styled-components';
import { myInfo } from '../../data/myInfo';
import { CommentType } from '../../API/Boards';
interface CommentHeaderProps {
  commentFlipBind: {
    commentFlip: boolean;
    setCommentFlip: React.Dispatch<React.SetStateAction<boolean>>;
  };
  commentListData: CommentType[];
}
/** 댓글부분 container */
const CommentList = ({ commentFlipBind, commentListData }: CommentHeaderProps) => {
  const { commentFlip, setCommentFlip } = commentFlipBind;
  return (
    <CommentContainerS commentFlip={commentFlip}>
      {commentListData.map((commentData, i) => {
        return (
          <div key={i}>
            <CommentBox commentData={commentData} />
            {/* <ReplyBox commentData={commentData} /> */}
          </div>
        );
      })}
    </CommentContainerS>
  );
};

export { CommentList };

interface CommentBoxProps {
  commentData: CommentType;
}

/** 댓글과 답글 list */
const CommentBox = ({ commentData }: CommentBoxProps) => {
  // console.log(commentData.profileImage);
  const defalutPofileImage = (imageUrl: string) => {
    if (imageUrl === 'default') {
      return `${process.env.PUBLIC_URL}/defalutProfileImage.jpg`;
    }
  };

  return (
    <CommentBoxS>
      <img src={defalutPofileImage(commentData.profileImage)} alt='답글프로필' />
      <CommentContentS>
        <div className='profile'>
          <h2>{commentData.nickname}</h2>
          <p>{commentData.createDate}</p>
        </div>
        <p className='text'>{commentData.content}</p>
        <CommentOptionS>
          <h2>답글</h2>
          <h2>삭제</h2>
        </CommentOptionS>
      </CommentContentS>
    </CommentBoxS>
  );
};

const CommentContainerS = styled.div<{ commentFlip: boolean }>`
  height: ${(props) => (props.commentFlip ? '0px' : 'auto')};
  margin: ${(props) => (props.commentFlip ? 'none' : '1rem 0')};
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

/** 2023-08-25 Comment.tsx - 그룹페이지 댓글 전체 내용 */
const CommentBoxS = styled.div`
  gap: 0.5rem;
  display: flex;
  align-items: start;
  min-height: 2rem;
  border-radius: 1rem;
  img {
    width: 1.875rem;
  }
`;

/** 2023-08-25 Comment.tsx - 그룹페이지 댓글 내용, 답글 탭 */
const CommentContentS = styled.div`
  margin-left: 0.5rem;
  margin-top: 0.31rem;
  width: '19.0625rem';
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .profile {
    display: flex;
    align-items: center;
    gap: var(--height-gap);
    margin-bottom: 0.37rem;

    h2 {
      font-size: 0.875rem;
    }
  }

  p.text {
    font-size: 0.875rem;
    color: var(--font-color2);
    margin-bottom: var(--height-gap);
  }
`;

/** 2023-09-02 Comment.tsx - 답글, 삭제 */
const CommentOptionS = styled.div`
  display: flex;
  gap: 1.5rem;

  h2 {
    font-size: 0.875rem;
    &.delete {
      color: var(--font-color3);
    }
  }
`;
