import {
  axios,
  styled,
  useState,
  useEffect,
  useParams,
  getBoards,
  initUser,
  getUser,
  useNavigate,
  useRecoilState,
} from './PostBarrel';

import type { BoardsType, GetUser } from './PostBarrel';
import { INVALID_TOKEN, EXPIRED_TOKEN } from './PostBarrel';
import { Comment, GroupPost, refreshState } from './PostBarrel';

const GroupPostList = () => {
  const { mindId } = useParams<string>();
  const [postData, setPostData] = useState<BoardsType[]>([]);
  const [userInfo, setUserInfo] = useState<GetUser>(initUser);
  const navigate = useNavigate();
  const [refresh] = useRecoilState<number>(refreshState);

  useEffect(() => {
    getBoards(Number(mindId)).then((res: BoardsType[]) => {
      setPostData(res);
    });
  }, [refresh]);

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

  return postData.length === 0 ? (
    <GroupNoPostS>
      <img src={`${process.env.PUBLIC_URL}/noMind.png`} alt='noMind'></img>
      <h2>등록된 인증글이 없습니다.</h2>
      <p>가장 먼저 작심을 인증해 보세요!</p>
    </GroupNoPostS>
  ) : (
    <>
      {postData.map((postData, i) => {
        const postProps = { postData, userInfo };
        return (
          <PostContainerS key={i}>
            <GroupPost postProps={postProps} />
            <Comment postProps={postProps} />
          </PostContainerS>
        );
      })}
    </>
  );
};

export default GroupPostList;

const PostContainerS = styled.article`
  margin-bottom: 2.5rem;
`;

const GroupNoPostS = styled.div`
  height: 466px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  img {
    width: 7.5rem;
    margin-bottom: 1rem;
  }
  p {
    color: var(--font-color3);
  }
`;
