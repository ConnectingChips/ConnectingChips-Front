import {
  axios,
  styled,
  useState,
  useEffect,
  useParams,
  useNavigate,
  useRecoilState,
} from '../GroupPageBarrel';
import { getBoards, initUser, getUser, refreshState, GroupPost } from '../GroupPageBarrel';
import type { BoardsType, GetUser } from '../GroupPageBarrel';
import { INVALID_TOKEN, EXPIRED_TOKEN } from '../GroupPageBarrel';

const GroupPostList = () => {
  const { mindId } = useParams<string>();
  const [mindData, setMindData] = useState<BoardsType[]>([]);
  const [userInfo, setUserInfo] = useState<GetUser>(initUser);
  const navigate = useNavigate();
  const [refresh] = useRecoilState<number>(refreshState);

  useEffect(() => {
    getBoards(Number(mindId)).then((res: BoardsType[]) => {
      setMindData(res);
    });
  }, [refresh, mindId]);

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

  return (
    <GroupPostListContainerS>
      <GroupPostListS>
        <h2 className='headLine'>작심 인증글</h2>
        {mindData.length !== 0 ? (
          <>
            {mindData.map((postData) => {
              const postProps = { postData, userInfo };
              return <GroupPost postProps={postProps} sort='groupPage' key={postData.boardId} />;
            })}
          </>
        ) : (
          <EmptyPost />
        )}
      </GroupPostListS>
    </GroupPostListContainerS>
  );
};

const EmptyPost = () => {
  return (
    <EmptyPostS>
      <img src={`${process.env.PUBLIC_URL}/assets/noMind.png`} alt='noMind'></img>
      <h2>등록된 인증글이 없습니다.</h2>
      <p>가장 먼저 작심을 인증해 보세요!</p>
    </EmptyPostS>
  );
};

export default GroupPostList;

const GroupPostListContainerS = styled.div`
  background-color: var(--color-bg);
`;

const GroupPostListS = styled.div`
  margin: 0 auto 2.5rem auto;
  max-width: var(--width-max);
  display: flex;
  flex-direction: column;
  .headLine {
    font-size: var(--head-b);
    margin: 1.25rem 1rem 1.25rem 1rem;
  }
`;

const EmptyPostS = styled.div`
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
