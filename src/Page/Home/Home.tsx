import { styled, useEffect, useState, useNavigate } from './HomeBarrel';
import { scrollTop, fetchMyList, initMyList, shareKakao } from './HomeBarrel';
import { MyMisson, GroupList } from './HomeBarrel';
import {
  Banner as BannerImage,
  Logo_002,
  헤드셋칩스,
  기본프로필,
  Share_Icon,
} from './HomeImageBarrel';
import { GNB } from '../../AppBarral';

// FIXME: 사라질 코드
import { myInfo, myGroupList } from './HomeBarrel';

const { Kakao } = window;

/** 2023-08-20 Home.tsx - 메인 컴프 */
const Home = (): JSX.Element => {
  const [access_token, setAccess_token] = useState('');

  // TODO: 갈아끼울 코드
  // const [myList, setMyList] = useState(initMyList.data);

  // FIXME: 사라질 코드
  // const [myList, setMyList] = useState(initMyList);
  const [istodayDone, setIsDone] = useState(false);

  // FIXME: User ID 받아오기
  const nickName = '{닉네임}';

  useEffect(() => {
    scrollTop();

    const KAKAO_KEY = process.env.REACT_APP_KAKAO_SHARE;

    Kakao.cleanup();
    if (!Kakao.isInitialized()) {
      Kakao.init(KAKAO_KEY);
    }
  }, []);

  useEffect(() => {
    const access_token = localStorage.getItem('access_token');
    if (access_token) setAccess_token(access_token);

    // TODO: 사용하게 될 코드
    // fetchMyList(setMyList);

    const isDone = myGroupList.some((group) =>
      group.memberList.find((member) => member.member_id === myInfo.my_id && member.done),
    );
    // const isDone = myList.some((mind) => mind.isDoneToday);
    setIsDone(isDone);

    // TODO: 사용할 코드
    // }, [access_token, myList]);

    // FIXME: 삭제하게 될 코드
  }, [access_token]);

  const navigate = useNavigate();
  const profileClick = () => {
    if (access_token) return navigate(`/myPage/${myInfo.my_id}`);

    navigate('/LogIn');
  };

  return (
    <HomeS>
      <HomeHeaderS>
        <img src={Logo_002} alt='logo' className='Logo' />
        <div className='userInfo'>
          <img src={Share_Icon} alt='share' onClick={() => shareKakao()} />
          <img src={기본프로필} alt='기본 프로필' onClick={profileClick} />
        </div>
      </HomeHeaderS>
      <HomeContentS>
        <WelcomeHeadS>
          <WelcomeTextS>
            {access_token && istodayDone ? (
              <h1>
                {/* TODO: 갈아끼울 코드 */}
                {/* 멋져요 {nickName}칩스! <br /> */}
                {/* FIXME: 사라질 코드 */}
                멋져요 {myInfo.my_id}칩스! <br />
                내일도 함께 해<br />
                주실 거죠?
              </h1>
            ) : access_token ? (
              <h1>
                {/* TODO: 갈아끼울 코드 */}
                {/* 반가워요 {nickName}칩스! <br /> */}
                {/* FIXME: 사라질 코드 */}
                반가워요 {myInfo.my_id}칩스! <br />
                오늘도 함께 작심을
                <br /> 성공해볼까요?
              </h1>
            ) : (
              <h1>
                <p className='bold'>딱 3일!</p>
                {/* <br /> */}
                재미있게
                <br /> 삼칩하자!
              </h1>
            )}
          </WelcomeTextS>
          {!access_token && <img src={헤드셋칩스} alt='헤드셋칩스' />}
        </WelcomeHeadS>
        {/* TODO: 갈아끼울 코드 */}
        {/* {myList && access_token && <MyMisson myList={myList} />} */}

        {/* FIXME: 사라질 코드 */}
        {myGroupList && access_token && <MyMisson mygrouplist={myGroupList} />}
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
        <h2>칩스님의 의견을 들려주세요</h2>
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

  .Logo {
    height: 1.3125rem;
  }

  .userInfo {
    :first-child {
      margin-right: 0.75rem;
    }
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
