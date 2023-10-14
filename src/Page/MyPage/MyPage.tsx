import { goBack } from '../../Component/Mission/GroupHeader';
import TermsValue from '../../Type/TermsValue';
import { DivideBaS } from '../GroupPage/GroupPageBarrel';
import { styled, useEffect, useState, logoutUser, getMyList } from './MypageBarrel';
import { Arrow_Left_B, Info_icon_B } from './MypageBarrel';
import { ArticleTab, ConfirmModal, TermsModal } from './MypageBarrel';
import { scrollTop, getUser } from './MypageBarrel';
import type { GetUser, Mylist } from './MypageBarrel';
import { initUser, initMyList } from './MypageBarrel';
import { CurrentMind, EndMindList } from './MypageBarrel';

const MyPage = (): JSX.Element => {
  const [myInfo, setMyInfo] = useState<GetUser>(initUser);
  const [myList, setMyList] = useState<Mylist[]>(initMyList);
  const ListBind = { myList, setMyList };
  const compArr: JSX.Element[] = [
    <CurrentMind ListBind={ListBind} />,
    <EndMindList myListLen={myList.length} />,
  ];
  const tabText: string[] = [`참여중인 작심(${myList.length}/3)`, '참여했던 작심'];

  useEffect(() => {
    scrollTop();

    getUser()
      .then((myInfo: GetUser) => setMyInfo(myInfo))
      .catch(() => {});
    getMyList()
      .then((res: Mylist[]) => setMyList(res))
      .catch(() => {});
  }, []);

  return (
    <MyPageS>
      <MyPageHeader />
      <ProfileHeaderS>
        <h2>
          {myInfo.nickname}칩스’s
          <br />
          작심서랍
        </h2>
        <img src={myInfo.profileImage} alt='기본프로필' />
      </ProfileHeaderS>
      {myList.length === 3 && (
        <LimitInfoS>
          <img src={Info_icon_B} alt='인포프로필' />
          <p>
            다른 그룹에 참여하시려면 그룹 나가기를 해주세요.
            <br />
            (최대 참여 그룹 3개)
          </p>
        </LimitInfoS>
      )}

      <ArticleTab compArr={compArr} tabText={tabText} />
      <DivideBaS />
      <MyPageSetting />
    </MyPageS>
  );
};

export default MyPage;

const MyPageHeader = (): JSX.Element => {
  return (
    <GroupBGHeaderS>
      <img src={Arrow_Left_B} onClick={goBack} alt='Arrow icon' />
      <h2>MY</h2>
    </GroupBGHeaderS>
  );
};

const MyPageSetting = (): JSX.Element => {
  const [confirmLogout, setConfirmLogout] = useState<boolean>(false);
  const [showTerms, setshowTerms] = useState<TermsValue>('');
  const termsBind = { state: showTerms, Setter: setshowTerms };

  return (
    <>
      <MyPageSetS>
        <h2>설정</h2>
        <ul>
          <li onClick={() => setshowTerms('이용약관')}>이용약관</li>
          <li onClick={() => setshowTerms('개인정보 처리 방침')}>개인정보 처리 방침</li>
          <li onClick={() => setshowTerms('개인정보 수집 및 이용 동의')}>
            개인정보 수집 및 이용 동의
          </li>
          <li onClick={() => setConfirmLogout(true)}>로그아웃</li>
        </ul>
      </MyPageSetS>

      {showTerms === '이용약관' && <TermsModal termsBind={termsBind} />}
      {showTerms === '개인정보 처리 방침' && <TermsModal termsBind={termsBind} />}
      {showTerms === '개인정보 수집 및 이용 동의' && <TermsModal termsBind={termsBind} />}
      {confirmLogout && (
        <ConfirmModal
          setConfirm={setConfirmLogout}
          confirmText='로그아웃 하시겠어요?'
          action='로그아웃'
          method={() => logoutUser()}
          routeUrl='/'
        />
      )}
    </>
  );
};

const MyPageS = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MyPageHeaderS = styled.header`
  position: sticky;
  top: 0;

  width: 100%;
  height: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`;

const GroupBGHeaderS = styled(MyPageHeaderS)`
  z-index: 10;
  justify-content: center;
  background-color: white;
  min-width: var(--width-min);

  padding: 1rem 0;

  img {
    position: absolute;
    left: 1.67rem;
  }

  h2 {
    font-size: 1.25rem;
  }
`;

const ProfileHeaderS = styled.div`
  box-sizing: border-box;
  width: 100%;
  min-width: var(--width-min);
  height: 6.3125rem;

  display: flex;
  align-items: center;
  padding: 0 1rem;

  justify-content: space-between;

  background-color: var(--font-color1);
  color: #fff;

  img {
    width: 3.75rem;
  }
`;

const LimitInfoS = styled.div`
  background: #ffd32c;
  width: 100%;
  height: 3.25rem;

  display: flex;
  align-items: flex-start;

  box-sizing: border-box;
  padding: 0.5rem 1rem;
  gap: 0.25rem;

  img {
    margin-top: 0.155rem;
  }
  p {
    font-size: 0.75rem;
    font-weight: 500;
  }
`;

const MyPageSetS = styled.div`
  padding: 0 1rem;
  width: 100%;
  box-sizing: border-box;
  max-width: var(--width-max);
  min-width: var(--width-min);

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
