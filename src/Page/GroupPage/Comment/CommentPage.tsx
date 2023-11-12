import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { isCommentInputFocused } from '../../../data/initialData';
import Bind from '../../../Type/Bind';
import {
  axios,
  BoardsType,
  EXPIRED_TOKEN,
  getBoards,
  GetUser,
  getUser,
  initUser,
  INVALID_TOKEN,
  styled,
  useNavigate,
  useParams,
  boardsEmptyValue,
  GroupHeader,
} from '../GroupPageBarrel';
import GroupPost from '../Post/GroupPost';
import { refreshState } from '../GroupPageBarrel';
import Comment from './Comment';
import { CommentInput } from './CommentInput';
import { scrollTop } from '../../MyPage/MypageBarrel';

const CommentPage = () => {
  const navigate = useNavigate();
  const { mindId, postId } = useParams<string>();
  const [postData, setPostData] = useState<BoardsType>(boardsEmptyValue);
  const [userInfo, setUserInfo] = useState<GetUser>(initUser);
  const [refresh] = useRecoilState<number>(refreshState);
  const [isInputFocused, setIsInputFocused] = useRecoilState(isCommentInputFocused);

  // 0이면 댓글 아니면 댓글의 commentId로 답글만들기
  const [isComment, setIsComment] = useState<number>(0);
  const isCommentBind: Bind<number> = { state: isComment, Setter: setIsComment };

  useEffect(() => {
    fetchData();
    fetchUser();
    scrollTop();
  }, [mindId, postId, refresh]);

  const fetchData = async () => {
    try {
      const res = await getBoards(Number(mindId));
      const filterPostData = res.filter((data) => data.boardId === Number(postId));
      setPostData(filterPostData[0]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchUser = async () => {
    try {
      const userData = await getUser();
      setUserInfo(userData);
    } catch (error) {
      handleTokenErrors(error);
    }
  };

  const handleTokenErrors = (error: any) => {
    console.error(error);
    if (axios.isAxiosError(error)) {
      if ([EXPIRED_TOKEN, INVALID_TOKEN].includes(error.response?.data.code)) {
        localStorage.removeItem('access_token');
        navigate('/');
      }
    }
  };

  // 게시글 삭제 시 groupPage로 이동
  if (!postData) {
    navigate(`/groupPage/${mindId}`);
    return null;
  }

  const postProps = { postData, userInfo };

  return (
    <CommentPageContainer>
      <GroupHeader />
      <PostContainerS>
        <GroupPost postProps={postProps} sort='commentPage' />
        {postData.commentList.length !== 0 ? (
          <CommentContainerS isInputFocused={isInputFocused}>
            <CommentToolbarS>댓글 {postData.commentCount}</CommentToolbarS>
            {postData.commentList.map((commentData) => (
              <Comment
                userInfo={userInfo}
                setIsComment={setIsComment}
                commentData={commentData}
                key={commentData.commentId}
              />
            ))}
          </CommentContainerS>
        ) : (
          <CommentEmpty />
        )}
        <CommentInput postData={postData} userInfo={userInfo} isCommentBind={isCommentBind} />
      </PostContainerS>
    </CommentPageContainer>
  );
};

export default CommentPage;

const CommentEmpty = () => {
  return (
    <CommentEmptyS>
      <p className='title'>등록된 댓글이 없습니다.</p>
      <p className='content'>응원 댓글을 통해 따듯한 작심월드를 만들어 주세요</p>
    </CommentEmptyS>
  );
};

const CommentPageContainer = styled.div`
  height: 100dvh;
  width: 100vw;
`;

const PostContainerS = styled.div`
  max-width: var(--width-max);
  margin: var(--height-header) auto 0 auto;
`;

const CommentEmptyS = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
  margin: 2.5rem 0 3.56rem 0;
  .title {
    font-size: var(--head-b);
    font-weight: 500;
  }
  .content {
    font-size: var(--body-b);
    color: var(--font-color3);
  }
`;

const CommentContainerS = styled.div<{ isInputFocused: boolean }>`
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
  margin-bottom: 0.69rem;
  padding-bottom: ${(props) => (props.isInputFocused ? '5rem' : '')};
`;

const CommentToolbarS = styled.h2`
  margin: 0.37rem 1rem 0.75rem 1rem;
  font-size: 1rem;
`;
