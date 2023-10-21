import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { Arrow_Left_B } from '../../../Component/IconBarrel/ArrowBarrel';
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
} from '../GroupPageBarrel';
import GroupPost from '../Post/GroupPost';
import { refreshState } from '../Post/PostListBarrel';
import Comment from './Comment';
import { CommentInput } from './CommentInput';
import { CommentToolbar } from './CommentToolbar';

const CommentPage = () => {
  const { mindId } = useParams<string>();
  const { postId } = useParams<string>();
  const [postData, setPostData] = useState<BoardsType>(boardsEmptyValue);
  const [userInfo, setUserInfo] = useState<GetUser>(initUser);
  const [refresh] = useRecoilState<number>(refreshState);
  const navigate = useNavigate();
  const [isInputFocused, setIsInputFocused] = useRecoilState(isCommentInputFocused);
  // 0이면 댓글 아니면 댓글의 commentId로 답글만들기
  const [isComment, setIsComment] = useState<number>(0);
  const isCommentBind: Bind<number> = { state: isComment, Setter: setIsComment };

  window.scrollTo(0, document.body.scrollHeight);

  // 데이터 받아오는 코드
  useEffect(() => {
    (async () => {
      try {
        const res = await getBoards(Number(mindId));
        const filterMindData = res.filter((data) => {
          return data.boardId === Number(postId);
        });
        setPostData(filterMindData[0]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    })();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mindId, postId, refresh]);

  // 토큰 만료시 홈으로 보내주는 코드
  useEffect(() => {
    (async () => {
      try {
        const userData = await getUser();
        setUserInfo(userData);
      } catch (error) {
        console.error(error);
        // TODO: 코드 중복 수정 필요 / 공통으로 처리할 에러 정리 필요
        if (axios.isAxiosError(error)) {
          if (error.response?.data.code === EXPIRED_TOKEN) {
            localStorage.removeItem('access_token');
            return navigate('/');
          }

          if (error.response?.data.code === INVALID_TOKEN) {
            localStorage.removeItem('access_token');
            return navigate('/');
          }
        }
      }
    })();
  }, []);

  if (!postData) {
    navigate(`/groupPage/${mindId}`); // groupPage로의 경로를 정확하게 입력해주세요.
    return null;
  }

  const postProps = { postData, userInfo };

  return (
    <CommentPageContainer>
      <CommentHeader />
      <PostContainerS>
        <GroupPost postProps={postProps} sort='commentPage' />
        {postData.commentList.length !== 0 ? (
          <CommentContainerS isInputFocused={isInputFocused}>
            <CommentToolbar postData={postData} />
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

const CommentHeader = () => {
  return (
    <CommentHeaderS>
      <img src={Arrow_Left_B} alt='Arrow_Left_B' onClick={goBack} />
    </CommentHeaderS>
  );
};

const CommentEmpty = () => {
  return (
    <CommentEmptyS>
      <p className='title'>등록된 댓글이 없습니다.</p>
      <p className='content'>응원 댓글을 통해 따듯한 작심월드를 만들어 주세요</p>
    </CommentEmptyS>
  );
};

const goBack = (): void => window.history.back();

const CommentPageContainer = styled.div`
  height: 100dvh;
  width: 100vw;
`;

const CommentHeaderS = styled.header`
  width: 100%;
  position: fixed;
  display: flex;
  align-items: center;
  padding: 1rem;
  top: 0;
  box-sizing: border-box;
  height: var(--height-header);
  background-color: var(--color-white);
`;

const PostContainerS = styled.div`
  max-width: 500px;
  margin: 3.5rem auto 0 auto;
`;

const CommentEmptyS = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
  margin: 2.5rem 0 3.56rem 0;
  .title {
    font-size: 1.25rem;
    font-weight: 500;
  }
  .content {
    font-size: 0.875rem;
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
