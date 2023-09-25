/** 2023-08-26 GroupPage.tsx - 그룹페이지 글 항목 */
import { useState, styled, useEffect } from './GroupPageBarrel';
import { Comment, GroupPost } from './GroupPageBarrel';
import { getBoards, BoardsType } from '../../API/Boards';
import { useNavigate, useParams } from 'react-router-dom';
import { getUser } from '../../API/Users';
import { GetUser } from '../../Type/User';
import { initUser } from '../../data/initialData';
import axios from 'axios';
import {
  SERVER_ERROR,
  INVALID_TOKEN,
  EXPIRED_TOKEN,
  AXIOS_NETWORK_ERROR,
} from '../../constant/error';
interface GroupPostListProps {
  refreshBind: {
    refresh: number;
    setRefresh: React.Dispatch<React.SetStateAction<number>>;
  };
}

const GroupPostList = ({ refreshBind }: GroupPostListProps) => {
  const { mindId } = useParams<string>();
  const [postData, setPostData] = useState<BoardsType[]>([]);
  const [userInfo, setUserInfo] = useState<GetUser>(initUser);
  const navigate = useNavigate();
  const { refresh } = refreshBind;
  useEffect(() => {
    getBoards(Number(mindId)).then((res: BoardsType[]) => {
      setPostData(res);
    });
  }, [refresh]);

  // useEffect(() => {
  //   getUser().then((userInfo: GetUser) => {
  //     setUserInfo(userInfo);
  //   });
  // }, []);

  useEffect(() => {
    (async () => {
      try {
        const res = await getUser();
        setUserInfo(res);
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

  return (
    <GroupPostListS>
      <h2 style={{ margin: '0 1rem' }}>작심 인증글</h2>
      {postData.length > 0 ? (
        postData.map((postData, i) => (
          <div key={i}>
            <GroupPost
              passsort='Page'
              postData={postData}
              refreshBind={refreshBind}
              userInfo={userInfo}
            />
            <Comment postData={postData} userInfo={userInfo} refreshBind={refreshBind} />
          </div>
        ))
      ) : (
        <GroupNoPost />
      )}
    </GroupPostListS>
  );
};

export { GroupPostList };

const GroupNoPost = () => {
  return (
    <GroupNoPostS>
      <img src={`${process.env.PUBLIC_URL}/noMind.png`} alt='noMind'></img>
      <h2>등록된 인증글이 없습니다.</h2>
      <p>가장 먼저 작심을 인증해 보세요!</p>
    </GroupNoPostS>
  );
};

const GroupPostListS = styled.div`
  margin: 0 auto;
  width: var(--width-mobile);
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  gap: 2.5rem;
  h2 {
    font-size: 1.125rem;
  }
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
