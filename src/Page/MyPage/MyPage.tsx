import styled from 'styled-components';
import { Arrow_Left_B } from '../../Component/ArrowBarrel';
import 기본프로필 from '../../image/예시사진모음/default_profile_W_MyPage.png';
import infoIcon from '../../image/Icon/icon_Info.png';
import { useState } from 'react';

const MyPage = () => {
  const 닉네임 = '닉네임';
  const myGroupCount = 3;
  const nameList = ['점심엔 산책 어때요?', '헬스 OOTD 인증하기', '회사에서 등산하기'];
  const dateList = [12, 3, 1];

  const [articleIndex, setArticleIndex] = useState('CurrentMind');
  const isCurrentMind = articleIndex === 'CurrentMind';

  return (
    <MyPageS>
      <MyPageHeader />
      <ProfileHeaderS>
        <h2>
          {닉네임}칩스’s
          <br />
          작심서랍
        </h2>
        <img src={기본프로필} alt='기본프로필' />
      </ProfileHeaderS>
      <LimitInfoS>
        <img src={infoIcon} alt='기본프로필' />
        <p>최대 3개의 그룹까지 참여 가능합니다.</p>
      </LimitInfoS>
      <MyPageArticleS>
        <MyPageArticleHeadS>
          <li
            className={isCurrentMind ? 'selected' : ''}
            onClick={() => setArticleIndex('CurrentMind')}
          >
            참여중인 작심({myGroupCount}/3)
          </li>
          <li
            className={isCurrentMind ? '' : 'selected'}
            onClick={() => setArticleIndex('FinishedMind')}
          >
            참여했던 작심
          </li>
        </MyPageArticleHeadS>
        {/* <CurrentMind/> */}
        {isCurrentMind ? (
          <CurrentMindListS>
            {nameList.map((name, idx) => {
              return (
                <MindS key={idx}>
                  <p className='main'>{name}</p>
                  <ExitButtonS>그룹 나가기</ExitButtonS>
                </MindS>
              );
            })}
          </CurrentMindListS>
        ) : (
          <CurrentMindListS>
            {nameList.map((name, index) => {
              return (
                <MindS key={index}>
                  <div>
                    <p className='main'>{name}</p>
                    <p className='sub'>{dateList[index]}일 작심 성공</p>
                  </div>
                  {/* <ReMindButtonS>다시 참여하기</ReMindButtonS> */}
                  <FullJoinButtonS>다시 참여하기</FullJoinButtonS>
                </MindS>
              );
            })}
          </CurrentMindListS>
        )}

        {/* <FinishedMind/> */}
      </MyPageArticleS>
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

const MyPageArticleS = styled.article`
  &::after {
    content: '';
    display: block;
    height: 0.5rem;
    background-color: var(--color-line);
  }
`;

const MyPageArticleHeadS = styled.ul`
  display: flex;
  height: 3rem;
  margin: 0 1rem;

  li {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--font-color3);
    border-bottom: 0.25rem solid transparent;

    &.selected {
      border-bottom-color: var(--color-main);
      color: var(--font-color1);
    }
  }
`;

const CurrentMindListS = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  margin: 1.25rem 1rem;
`;

const MindS = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: var(--color-line);
  padding: 1rem;

  box-sizing: border-box;
  height: 4.375rem;
  border-radius: 5px;

  p.main {
    font-size: 1rem;
    font-weight: 500;
  }
  p.sub {
    color: var(--font-color2);
  }
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




const myPageButton = styled.button`
  height: 2rem;
  border-radius: 1.25rem;
`

const ExitButtonS = styled(myPageButton)`
  background-color: #fff;
  border: 1px solid var(--font-color3);
  padding: 0 0.75rem;
`;


const ReMindButtonS = styled(myPageButton)`
  background-color: var(--color-main);
  padding: 0 1rem;
`;

const FullJoinButtonS = styled(myPageButton)`
  background-color: var(--color-disabled2);
  color: var(--color-disabled1);
  padding: 0 1rem;
`;
