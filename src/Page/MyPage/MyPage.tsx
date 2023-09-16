import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Arrow_Left_B } from '../../Component/ArrowBarrel';
import 기본프로필 from '../../image/예시사진모음/default_profile_W_MyPage.png';
// import infoIcon from '../../image/Icon/icon_Info.png';
import Info_icon_B from '../../image/Icon/Info_icon_B.svg';
import ArticleTab from '../../Component/ArticleTab';
import { CurrentMind, FinishedMindList } from './MyPageMind';

// FIXME: 버려질 코드
import { myInfo, myGroupList } from '../../data/myInfo';
import ConfirmModal from '../../Component/ConfirmModal';
import { scrollTop } from '../Home/HomeBarrel';

const MyPage = () => {
  const tabText = [`참여중인 작심(${myGroupList.length}/3)`, '참여했던 작심'];
  const compArr = [<CurrentMind />, <FinishedMindList />];
  const [confirmLogout, setConfirmLogout] = useState(false);

  // TODO: 잠깐 비활성화
  // useEffect(() => {
  //   scrollTop();
  // }, []);

  return (
    <MyPageS>
      <MyPageHeader />
      <ProfileHeaderS>
        <h2>
          {/* TODO: 닉네임으로 변환 */}
          {myInfo.my_id}칩스’s
          <br />
          작심서랍
        </h2>
        <img src={기본프로필} alt='기본프로필' />
      </ProfileHeaderS>
      {myGroupList.length === 3 && (
        <LimitInfoS>
          <img src={Info_icon_B} alt='인포프로필' />
          <p>최대 3개의 그룹까지 참여 가능합니다.</p>
        </LimitInfoS>
      )}

      <ArticleTab tabText={tabText} compArr={compArr} />
      <MyPageSetS>
        <h2>설정</h2>
        <ul>
          <li onClick={() => console.log('강희님꺼 꺼억쓰')}>이용약관</li>
          <li onClick={() => setConfirmLogout(true)}>로그아웃</li>
        </ul>
      </MyPageSetS>

      {confirmLogout && (
        <ConfirmModal setConfirm={setConfirmLogout} confirmText='로그아웃하시겠습니까?' />
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
