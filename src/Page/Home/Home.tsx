import { styled, Link, useEffect, useState } from "./HomeBarrel";
import { MyMisson, GroupList } from "./HomeBarrel";
import { scrollTop, myInfo, myGroupList } from "./HomeBarrel";
import { Banner as BannerImage, Logo_002, 헤드셋칩스 } from "./HomeImageBarrel";
import { GNB } from "../../AppBarral";

/** 2023-08-20 Home.tsx - 메인 컴프 */
const Home = (): JSX.Element => {
  const [access_token, setAccess_token] = useState("");
  const tokenBind = { access_token, setAccess_token };

  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    if (access_token) setAccess_token(access_token);
  }, [access_token]);

  useEffect(() => {
    scrollTop();
  }, []);

  /** 2023-09-03 Home.tsx - 오늘 작심 했으면 true */
  const todayDone = myGroupList.some(
    (mygroup) =>
      mygroup.memberList.filter((member) => {
        if (member.member_id === myInfo.my_id) return member.done;
      })[0].done
  );

  return (
    <HomeS>
      <HomeHeaderS>
        <img src={Logo_002} alt="logo" />
        <HomeLogin tokenbind={tokenBind} />
      </HomeHeaderS>
      <HomeContentS>
        <WelcomeHeadS>
          <WelcomeTextS>
            {access_token && todayDone ? (
              <h1>
                멋져요 {myInfo.my_id}칩스! <br />
                내일도 함께 해<br />
                주실 거죠?
              </h1>
            ) : access_token ? (
              <h1>
                반가워요 {myInfo.my_id}칩스! <br />
                오늘도 함께 작심을
                <br /> 성공해볼까요?
              </h1>
            ) : (
              <h1>
                <p className="bold">딱 3일!</p>
                {/* <br /> */}
                재미있게
                <br /> 삼칩하자!
              </h1>
            )}
          </WelcomeTextS>
          {!access_token && <img src={헤드셋칩스} alt="헤드셋칩스" />}
        </WelcomeHeadS>
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

// const baseurl = process.env.REACT_APP_BASE_URL;

interface tokenbind {
  access_token: string;
  setAccess_token: React.Dispatch<React.SetStateAction<string>>;
}

/** 2023-09-02 Home.tsx - 헤더 로그인 버튼 - adesti */
const HomeLogin = ({ tokenbind }: { tokenbind: tokenbind }) => {
  const { access_token, setAccess_token } = tokenbind;

  const clearStorage = () => {
    localStorage.clear();
    setAccess_token("");
  };

  return access_token ? (
    <button onClick={clearStorage}>로그아웃</button>
  ) : (
    <Link to="/login">
      <button>로그인</button>
    </Link>
  );
};

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
    <BannerS href={"https://docs.google.com/forms/d/e/1FAIpQLSfUEWLC19oM9kPgzitmki705aZxY8Wn5jkH1YtkMObi-1FHIg/viewform"} target="_blank">
      {/* <BannerS href={baseurl} target="_blank"> */}
      <div className="bannerText">
        <h2>칩스님의 의견을 들려주세요</h2>
        <p>작심삼칩을 부탁해</p>
      </div>
      <img src={BannerImage} alt="bannerImage" />
    </BannerS>
  );
};

/** 2023-08-22 Home.tsx - 설문조사 배너 */
const BannerS = styled.a`
  display: block;
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
    transform: translateX(9.5rem) translateY(-5.7rem);
  }
`;

/** 2023-08-20 Home.tsx - 홈화면 헤더 */
const HomeHeaderS = styled.header`
  z-index: 10;
  display: flex;
  height: 2.7rem;
  justify-content: space-between;
  align-items: center;

  background-color: var(--font-color1);
  padding: 1rem;

  position: sticky;
  top: 0;

  img {
    height: 1.8rem;
  }

  button {
    color: var(--color-bg);
    width: 5.125rem;
    height: 2rem;
    border: 0.1rem solid var(--color-bg);
    border-radius: 2rem;
  }
`;

/** 2023-08-20 Home.tsx - WelcomeTextS, MyMisson, CurrentMission 컨테이너 */
const HomeContentS = styled.div`
  margin: 0 1rem;
  margin-bottom: 5rem;
`;

/** 2023-08-20 Home.tsx - 오늘도 득근한 하루 되세요 */
const WelcomeTextS = styled.div`
  /* padding: 2rem 0; */
  /* border: 1px solid; */

  h1 {
    display: block;
    word-break: keep-all;

    p.bold {
      font-weight: 700;
      font-size: 1.75rem;
    }
  }
`;
