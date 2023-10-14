import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { Arrow_Left_B, Arrow_Left_W } from '../../../Component/ArrowBarrel';
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
} from '../GroupPageBarrel';
import GroupPost, { PostImageS } from '../Post/GroupPost';
import PostContent from '../Post/PostContent';
import PostHeader from '../Post/PostHeader';
import { refreshState } from '../Post/PostListBarrel';

const CommentPage = () => {
  const { mindId } = useParams<string>();
  const { postId } = useParams<string>();
  const [mindData, setMindData] = useState<BoardsType[]>([]);
  const [postData, setPostData] = useState<BoardsType>();
  const [userInfo, setUserInfo] = useState<GetUser>(initUser);
  const [refresh] = useRecoilState<number>(refreshState);
  const [toggleContentEdit, setToggleContentEdit] = useState<boolean>(false);
  const toggleContentEditbind = {
    toggleContentEdit,
    setToggleContentEdit,
  };
  const navigate = useNavigate();

  useEffect(() => {
    getBoards(Number(mindId)).then((res: BoardsType[]) => {
      setMindData(res);
    });
    const filterMindData = mindData.filter((data) => {
      return data.boardId === Number(postId);
    });
    setPostData(filterMindData[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refresh, postId]);

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
  }, [navigate]);

  if (!postData) {
    return null;
  }

  const postProps = { postData, userInfo };

  return (
    <CommentPageContainer>
      <CommentHeader />
      <PostContainerS>
        <GroupPost postProps={postProps} sort='commentPage' />
      </PostContainerS>
    </CommentPageContainer>
  );
};

export default CommentPage;

const CommentHeader = () => {
  return (
    <CommentHeaderS>
      <img src={Arrow_Left_B} alt='Arrow_Left_B' />
    </CommentHeaderS>
  );
};

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
`;

const PostContainerS = styled.div`
  max-width: 500px;
  margin: 3.5rem auto 0 auto;
`;
