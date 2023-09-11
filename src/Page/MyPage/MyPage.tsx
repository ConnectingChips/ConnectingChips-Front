import styled from 'styled-components';
import { Arrow_Left_B } from '../../Component/ArrowBarrel';
import 기본프로필 from '../../image/예시사진모음/default_profile_W_MyPage.png';
import infoIcon from '../../image/Icon/icon_Info.png';
import MyPageArticle from './MyPageArticle';

// FIXME: 버려질 코드
import { myInfo } from '../../data/myInfo';

const MyPage = () => {
  return (
    <MyPageS>
      <MyPageHeader />
      <ProfileHeaderS>
        <h2>
          {myInfo.my_id}칩스’s
          <br />
          작심서랍
        </h2>
        <img src={기본프로필} alt='기본프로필' />
      </ProfileHeaderS>
      <LimitInfoS>
        <img src={infoIcon} alt='기본프로필' />
        <p>최대 3개의 그룹까지 참여 가능합니다.</p>
      </LimitInfoS>
      <MyPageArticle />
      <MyPageSetS>
        <h2>설정</h2>
        <div onClick={() => {}}>로그아웃</div>
      </MyPageSetS>
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
      <h2>마이 페이지</h2>
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

  display: flex;
  flex-direction: column;
  gap: 1.06rem;

  div {
    color: #000;
  }
`;
