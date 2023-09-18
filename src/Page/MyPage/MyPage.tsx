import { styled, useEffect, useState } from './MypageBarrel';
import { Arrow_Left_B, 기본프로필, Info_icon_B } from './MypageBarrel';
import { ArticleTab, ConfirmModal } from './MypageBarrel';
import { scrollTop, type GetUser, getUser, type Mylist, getMyList, userInit } from './MypageBarrel';
import { myInfo, myGroupList, type GroupInfoType, initGroup } from './MypageBarrel';

const MyPage = () => {
  const [access_token, setAccess_token] = useState<string>('');

  // TODO: 갈아끼울 코드
  // const [my_Info, set_My_Info] = useState<GetUser>(userInit);
  // const [myList, setMylist] = useState<Mylist[]>(initMyList.data);
  // FIXME: 더미 코드
  const [my_Info, set_My_Info] = useState<GetUser>(userInit);
  const [myList, setMylist] = useState<GroupInfoType[]>([initGroup]);

  const [confirmLogout, setConfirmLogout] = useState<boolean>(false);

  // TODO: 실제 사용할 코드
  // useEffect(() => {
  //   scrollTop();
  //   setAccess_token(localStorage.getItem('access_token') || '');

  //   getUser().then((userInfo: GetUser) => set_My_Info(userInfo));
  //   getMyList().then((res: Mylist[]) => setMylist(res));
  // }, []);

  // FIXME: 더미 코드
  useEffect(() => {
    scrollTop();
    setAccess_token(localStorage.getItem('access_token') || '');
    setMylist(myGroupList);
    set_My_Info(myInfo);
  }, []);

  return (
    <MyPageS>
      <MyPageHeader />
      <ProfileHeaderS>
        <h2>
          {my_Info.nickname}칩스’s
          <br />
          작심서랍
        </h2>
        <img src={my_Info.profileImage} alt='기본프로필' />
      </ProfileHeaderS>
      {myList.length === 3 && (
        <LimitInfoS>
          <img src={Info_icon_B} alt='인포프로필' />
          <p>최대 3개의 그룹까지 참여 가능합니다.</p>
        </LimitInfoS>
      )}

      <ArticleTab />
      <MyPageSetS>
        <h2>설정</h2>
        <ul>
          <li onClick={() => console.log('강희님꺼 꺼억쓰')}>이용약관</li>
          <li onClick={() => setConfirmLogout(true)}>로그아웃</li>
        </ul>
      </MyPageSetS>

      {confirmLogout && (
        <ConfirmModal
          setConfirm={setConfirmLogout}
          confirmText='로그아웃하시겠습니까?'
          action='로그아웃'
          url='/users/logout'
        />
      )}
    </MyPageS>
  );
};

export default MyPage;

const goBack = (): void => {
  window.history.back();
};

const MyPageHeader = (): JSX.Element => {
  return (
    <GroupBGHeaderS>
      <img src={Arrow_Left_B} onClick={goBack} alt='Arrow icon' />
      <h2>MY</h2>
    </GroupBGHeaderS>
  );
};

const MyPageS = styled.div`
  width: var(--width-mobile);
`;

const MyPageHeaderS = styled.header`
  cursor: pointer;
  position: sticky;
  top: 0;

  height: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`;

const GroupBGHeaderS = styled(MyPageHeaderS)`
  z-index: 10;

  display: flex;
  justify-content: center;
  position: relative;

  img {
    position: absolute;
    left: 1.67rem;
  }

  h2 {
    font-size: 1.25rem;
  }
`;

const ProfileHeaderS = styled.div`
  height: 6.3125rem;

  display: flex;
  align-items: center;
  padding: 0 1rem;

  justify-content: space-between;

  background-color: var(--font-color1);
  color: #fff;
`;

const LimitInfoS = styled.div`
  background: #ffd32c;
  height: 2.0625rem;

  display: flex;
  align-items: center;

  padding: 0 1rem;
  gap: 0.25rem;
`;

const MyPageSetS = styled.div`
  margin: 1.75rem 1rem;

  ul {
    margin-top: 1.06rem;
    display: flex;
    flex-direction: column;
    gap: 2.125rem;
  }
  li {
    color: #000;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 0.2rem;
  }
`;
