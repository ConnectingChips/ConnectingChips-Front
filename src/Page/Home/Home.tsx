import { styled, useEffect, useState, useNavigate } from './HomeBarrel';
import { scrollTop, shareKakao } from './HomeBarrel';
import { MyMisson, GroupList } from './HomeBarrel';
import { Banner as BannerImage, Logo_002, 헤드셋칩스, Share_Icon } from './HomeImageBarrel';
import { GNB } from '../../AppBarral';

import { initMyList, userInit } from '../../data/initialData';
import { getUser } from '../../API/userService';
import { GetUser } from '../../Type/User';
import { getMyList, getisDoneAll } from '../../API/userMind';
import { Mylist } from '../../Type/userMind';

const { Kakao } = window;

/** 2023-08-20 Home.tsx - 메인 컴프 */
const Home = (): JSX.Element => {
  const [access_token, setAccess_token] = useState<string>('');
  const [istodayDone, setIsDone] = useState<boolean>(false);

  const [my_Info, set_My_Info] = useState<GetUser>(userInit);
  const [myList, setMylist] = useState<Mylist[]>(initMyList.data);

  type isDone = {
    joinedMindId: number;
    isDoneToday: boolean;
  };

  useEffect(() => {
    scrollTop();
    setAccess_token(localStorage.getItem('access_token') || '');
    console.log('access_token: ', access_token);

    if (access_token !== '') {
      console.log(1);
      getUser().then((userInfo: GetUser) => set_My_Info(userInfo));
      getMyList().then((res: Mylist[]) => setMylist(res));
      getisDoneAll().then((res: isDone[]) => {
        const doneValid = res.some((data) => data.isDoneToday);
        setIsDone(doneValid);
      });
    }


    console.log('깃 수리중');
    
    // 카카오 공유하기
    // const KAKAO_KEY = process.env.REACT_APP_KAKAO_SHARE;

    // Kakao.cleanup();
    // if (!Kakao.isInitialized()) {
    //   Kakao.init(KAKAO_KEY);
    // }
  }, [access_token]);

  const navigate = useNavigate();

  const profileClick = () => {
    if (access_token !== '') return getUser().then(() => navigate(`/myPage/${my_Info.userId}`));
    return navigate('/LogIn');
  };

  const nickName: string = my_Info.nickname;
  return (
    <HomeS>
      <HomeHeaderS>
        <img src={Logo_002} alt='logo' className='Logo' />
        <UserInfoS>
          <img className='share' src={Share_Icon} alt='share' onClick={() => shareKakao()} />
          <div className='profile' onClick={profileClick}>
            <img src={my_Info.profileImage} alt='기본 프로필' />
            <p>MY</p>
          </div>
        </UserInfoS>
      </HomeHeaderS>
      <HomeContentS>
        <WelcomeHeadS>
          <WelcomeTextS>
            {access_token && istodayDone ? (
              <h1>
                멋져요 {nickName}칩스! <br />
                작지만 확실한
                <br />
                성공 적립 완료!
              </h1>
            ) : access_token && myList.length === 0 ? (
              <h1>
                반가워요 {nickName}칩스! <br />
                아래 리스트에서
                <br />
                미션을 골라보세요 😊
              </h1>
            ) : access_token ? (
              <h1>
                반가워요 {nickName}칩스! <br />
                오늘도 함께 작심을
                <br /> 성공해볼까요?
              </h1>
            ) : (
              <h1>
                <p className='bold'>딱 3일!</p>
                재미있게
                <br /> 운동하자!
              </h1>
            )}
          </WelcomeTextS>
          {!access_token && <img src={헤드셋칩스} alt='헤드셋칩스' />}
        </WelcomeHeadS>
        {myList.length !== 0 && access_token && <MyMisson />}
        <Banner />
        <GroupList />
      </HomeContentS>

      {/* <div className="CTA">
        <GNB />
      </div> */}
    </HomeS>
  );
};

export default Home;

/** 2023-08-20 Home.tsx - 메인 컴프 스타일 */
const HomeS = styled.section`
  height: 100%;
  max-width: var(--width-mobile);
  width: var(--width-mobile);

  .CTA {
    position: sticky;
    bottom: 0;
  }
`;

/** 2023-09-02 Home.tsx - 인사말과 캐릭터 - Kadesti */
const WelcomeHeadS = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1.25rem 0;
  height: 7.8125rem;

  img {
    margin-right: 1.25rem;
  }
`;

/** 2023-08-22 Home.tsx - 설문조사 배너 */
const Banner = (): JSX.Element => {
  return (
    <BannerS
      href={
        'https://docs.google.com/forms/d/e/1FAIpQLSfUEWLC19oM9kPgzitmki705aZxY8Wn5jkH1YtkMObi-1FHIg/viewform'
      }
      target='_blank'
    >
      <div className='bannerText'>
        <h2>칩스님의 의견을 들려주세요!</h2>
        <p>작심삼칩을 부탁해</p>
      </div>
      <img src={BannerImage} alt='bannerImage' />
    </BannerS>
  );
};

/** 2023-08-22 Home.tsx - 설문조사 배너 */
const BannerS = styled.a`
  display: flex;
  position: relative;
  height: 5.5rem;
  background-color: var(--color-line);

  padding: 1rem;
  margin-bottom: 1.25rem;

  border-radius: 0.63rem;

  .bannerText {
    width: 7.9375rem;

    h2 {
      cursor: pointer;
    }
    p {
      cursor: pointer;
      font-size: 0.8125rem;
      margin-top: 0.25rem;
      color: var(--font-color2);
    }
  }
  img {
    width: 10.5625rem;
    position: absolute;
    right: 0;
    top: 0;
  }
`;

/** 2023-08-20 Home.tsx - 홈화면 헤더 */
const HomeHeaderS = styled.header`
  z-index: 10;
  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: var(--font-color1);
  padding: 1rem;

  position: sticky;
  top: 0;

  box-sizing: border-box;
  height: 3.5rem;

  .Logo {
    height: 1.3125rem;
  }
`;

const UserInfoS = styled.div`
  display: flex;
  align-items: center;

  .share {
    margin-right: 0.75rem;
  }

  .profile {
    display: flex;
    align-items: center;
    gap: 0.38rem;
  }

  p {
    font-size: 0.8125rem;
    margin-left: 0.37rem;
    color: white;
  }
`;

/** 2023-08-20 Home.tsx - WelcomeTextS, MyMisson, CurrentMission 컨테이너 */
const HomeContentS = styled.div`
  margin: 0 1rem;
  margin-bottom: 5rem;
`;

/** 2023-08-20 Home.tsx - 오늘도 득근한 하루 되세요 */
const WelcomeTextS = styled.div`
  h1 {
    display: block;
    word-break: keep-all;

    p.bold {
      font-weight: 700;
      font-size: 1.75rem;
    }
  }
`;
