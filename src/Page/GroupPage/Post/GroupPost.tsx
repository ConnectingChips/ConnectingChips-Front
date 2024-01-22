import {
  styled,
  useState,
  useNavigate,
  useParams,
  useRecoilState,
  PostProps,
  BoardsType,
} from '../GroupPageBarrel';
import PostHeader from './PostHeader';
import PostContent from './PostContent';
import comment_icon from '../../../image/Icon/comment_icon.svg';
import { isCommentInputFocused } from '../../../data/initialData';

const GroupPost = ({
  postProps,
  sort,
}: {
  postProps: PostProps;
  sort: 'groupPage' | 'commentPage';
}): JSX.Element => {
  const [isContentEdit, setIsContentEdit] = useState<boolean>(false);
  const isContentEditBind = {
    isContentEdit,
    setIsContentEdit,
  };
  const { postData } = postProps;

  return (
    <GroupPostS>
      <PostHeader setIsContentEdit={setIsContentEdit} postProps={postProps} />
      <PostImageS src={postData.image} alt='업로드 사진' />
      <PostContent isContentEditBind={isContentEditBind} postData={postData} />
      {sort === 'groupPage' ? (
        <>
          <CommentOptionsBar postData={postData} />
          <CommentPreview postProps={postProps} />
          <CommentInputBar postProps={postProps} />
        </>
      ) : (
        <></>
      )}
    </GroupPostS>
  );
};

export default GroupPost;

const CommentOptionsBar = ({ postData }: { postData: BoardsType }) => {
  const navigateCommentsPage = useNavigateCommentsPage(postData.boardId);
  return (
    <CommentOptionsBarS>
      <img src={comment_icon} alt='comment-icon' onClick={navigateCommentsPage}></img>
      <div onClick={navigateCommentsPage}>댓글 {postData.commentCount}</div>
    </CommentOptionsBarS>
  );
};

const CommentPreview = ({ postProps }: { postProps: PostProps }) => {
  const { commentList } = postProps.postData;
  const navigateCommentsPage = useNavigateCommentsPage(postProps.postData.boardId);
  const lastComment = commentList[commentList.length - 1];

  if (!commentList.length) return null;

  return (
    <CommentPreviewS onClick={navigateCommentsPage}>
      <img src={lastComment.profileImage} alt='profileImage' />
      <div className='nickname'>{lastComment.nickname}</div>
      <div className='content'>{lastComment.content}</div>
    </CommentPreviewS>
  );
};

const CommentInputBar = ({ postProps }: { postProps: PostProps }) => {
  const navigateCommentsPage = useNavigateCommentsPage(postProps.postData.boardId);
  const [isInputFocused, setIsInputFocused] = useRecoilState(isCommentInputFocused);

  const commentInputText =
    postProps.postData.commentCount === 0
      ? '가장 먼저 응원의 댓글을 적어주세요!'
      : '응원의 댓글을 적어주세요!';

  // 댓글페이지 이동시 input focus되도록하는 함수
  const handleCommentClick = () => {
    navigateCommentsPage();
    setIsInputFocused(true);
  };

  return (
    <CommentInputBarContainer>
      <CommentInputBarS onClick={handleCommentClick}>
        <div>{commentInputText}</div>
        <img src={`${process.env.PUBLIC_URL}/assets/commentInputButtonoff.svg`} alt='sendIcon' />
      </CommentInputBarS>
    </CommentInputBarContainer>
  );
};
// 댓글페이지로 이동시키는 함수
const useNavigateCommentsPage = (boardId: number) => {
  const navigate = useNavigate();
  const { mindId } = useParams();
  return () => navigate(`/grouppage/${mindId}/${boardId}`);
};

const GroupPostS = styled.div`
  margin: 0 1rem 0.69rem 1rem;
  background-color: var(--color-white);
  border-radius: 0.625rem;
  border: 1px solid var(--color-line);
  h2 {
    margin-bottom: var(--height-gap);
  }
`;

export const PostImageS = styled.img`
  width: 100%;
`;

const CommentOptionsBarS = styled.div`
  position: relative;
  height: 2.5rem;
  background-color: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1rem;

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: 1px;
    background-color: var(--color-line);
  }

  &::before {
    top: 0;
  }

  &::after {
    bottom: 0;
  }

  img {
    width: 1.25rem;
    height: 1.25rem;
  }
  div {
    font-size: 0.75rem;
    color: var(--font-color3);
  }
`;

const CommentPreviewS = styled.div`
  display: flex;
  align-items: center;
  height: 1.5rem;
  margin: 0.62rem 1rem 0 1rem;
  font-size: 0.875rem;

  img {
    height: 1.5rem;
    margin-right: 0.56rem;
  }
  .nickname {
    margin-right: 0.25rem;
    font-weight: 500;
    white-space: nowrap;
  }
  .content {
    color: var(--font-color3);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const CommentInputBarContainer = styled.div`
  margin: 0.5rem 0.91rem;
`;

const CommentInputBarS = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--color-bg);
  padding: 1.06rem 1rem;
  border: 1px solid #e3e3e3;
  border-radius: 0.5rem;
  font-size: 1rem;
  color: var(--font-color3);
`;
