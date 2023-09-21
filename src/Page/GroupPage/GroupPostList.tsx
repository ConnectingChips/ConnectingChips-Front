/** 2023-08-26 GroupPage.tsx - 그룹페이지 글 항목 */
import { useState, styled, useEffect } from './GroupPageBarrel';
import { Comment, GroupPost } from './GroupPageBarrel';
import { getBoards, BoardsType } from '../../API/Boards';
import { useParams } from 'react-router-dom';
import { getUser } from '../../API/Users';
import { GetUser } from '../../Type/User';
import { initUser } from '../../data/initialData';

const GroupPostList = () => {
  // TODO: post업애려면 Commendted false로 바꾸기
  const { mindId } = useParams<string>();
  const [postData, setPostData] = useState<BoardsType[]>([]);
  const [userInfo, setUserInfo] = useState<GetUser>(initUser);
  const [refresh, setRefresh] = useState(1);
  const refreshBind = { refresh, setRefresh };
  useEffect(() => {
    getBoards(Number(mindId)).then((res: BoardsType[]) => {
      setPostData(res);
    });
    getUser().then((userInfo: GetUser) => {
      setUserInfo(userInfo);
    });
  }, [refresh]);
  return (
    <GroupPostListS>
      <h2>작심 인증글</h2>
      <>
        {postData.length > 0 ? (
          postData.map((postData, i) => (
            <div key={i}>
              <GroupPost
                passsort='Page'
                postData={postData}
                userInfo={userInfo}
                refreshBind={refreshBind}
              />
              <Comment postData={postData} userInfo={userInfo} refreshBind={refreshBind} />
            </div>
          ))
        ) : (
          <GroupNoPost />
        )}
      </>
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
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  gap: 0.75rem;
  // FIXME: commentinput의 하단자리가 부족해서 댓글을 가려버려서 임시로 넣음
  margin-bottom: 50px;
  h2 {
    font-size: 1rem;
  }
`;

/** 2023-09-12 GroupPage.tsx - 그룹페이지 글 없을 때 사진 */
const GroupNoPostS = styled.div`
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
