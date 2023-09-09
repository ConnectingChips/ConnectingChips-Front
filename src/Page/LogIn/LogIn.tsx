import { useState, Link, styled, useNavigate } from "./LoginBarrel";
import { LogInS, LoginInputS, SignClearBtnS, Arrow_Right } from "./LoginBarrel";
import Banner from "../../Component/SignUp/Banner";
import Loginheader from "../../Component/SignUp/Loginheader";
import useLoginCheck from "../../Hooks/useLoginCheck";
import { myInfo } from "../Home/HomeBarrel";

type bindVlaue = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

/** 2023-08-24 LogIn.tsx - 로그인 페이지 */
const LogIn = (): JSX.Element => {
  const [inputState, setInputState] = useState("default");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const idBind: bindVlaue = { value: nickname, setValue: setNickname };
  const pwBind: bindVlaue = { value: password, setValue: setPassword };
  const navigate = useNavigate();

  useLoginCheck(navigate, "Done");
  const referrer = document.referrer;

  console.log("이전 페이지 URL: " + referrer);

  // const [password, setPassword] = useState("");
  // const [showPassword, setShowPassword] = useState(false);

  // const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setPassword(e.target.value);
  // };
  // const handleToggleShowPassword = (e: any) => {
  //   e.preventDefault();
  //   setShowPassword(!showPassword);
  // };

  const isDefault = inputState === "default";

  /** 2023-08-24 LogIn.tsx - 로그인 ID PW 입력창 컨테이너 */
  // const LoginInputContainer = (): JSX.Element => {
  //   return (
  //     <LoginInputContainerS>
  //       <LoginInput sort="ID" isdefault={isDefault} inputbind={idBind} />
  //       <LoginInput sort="PW" isdefault={isDefault} inputbind={pwBind} />
  //       {!isDefault && <p>아이디 혹은 비밀번호가 일치하지 않습니다</p>}
  //     </LoginInputContainerS>
  //   );
  // };

  /** 2023-08-24 LogIn.tsx - 로그인 요청 핸들러 */
  const LoginSubmit = async (e: React.MouseEvent<HTMLFormElement, MouseEvent>): Promise<void> => {
    e.preventDefault();

    try {
      if (nickname !== myInfo.my_id || password !== myInfo.password) {
        setInputState("false");
        throw Error("아이디 혹은 비밀번호가 일치하지 않습니다");
      }
      localStorage.setItem("access_token", "1234564862169");

      // const loginPost = await axios.post("/users/sign-in", {
      //   nickname,
      //   password,
      // });

      // const access_token = loginPost.data.access_token;
      // localStorage.setItem("access_token", access_token);

      // navigate(referrer);
      navigate(-1);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <LogInS>
      <Loginheader type="로그인" />
      <Banner />
      <LoginOuterContainerS>
        <LoginFormS onSubmit={LoginSubmit}>
          {/* <LoginInputContainer /> */}
          <LoginContainerS>
            <LoginInnerContainerS>
              <LoginInput sort="ID" isdefault={isDefault} inputbind={idBind} />
              <LoginInput sort="PW" isdefault={isDefault} inputbind={pwBind} />
            </LoginInnerContainerS>
            {!isDefault && <p className="error">아이디 혹은 비밀번호가 일치하지 않습니다</p>}
          </LoginContainerS>

          <SignClearBtnS type="submit">
            <p>로그인</p>
          </SignClearBtnS>
        </LoginFormS>
        <NudgeSignS>
          <p className="hoxy">회원이 아니신가요?</p>
          <Link to="/signUp">회원가입</Link>
          <div className="img">
            <img src={Arrow_Right} alt="arrowIcon" />
          </div>
        </NudgeSignS>
      </LoginOuterContainerS>
    </LogInS>
  );
};

export default LogIn;

/**
 * 2023-08-24 LogIn.tsx - 입력 창
 * @param sort id인지 password인지 식별
 * @param isDefault 기본값인지 한번 틀린상태인지 구분
 * @returns id입력창 또는 pw입력창
 */
const LoginInput = ({ sort, isdefault, inputbind }: { sort: "ID" | "PW"; isdefault: boolean; inputbind: bindVlaue }): JSX.Element => {
  const { value, setValue } = inputbind; 

  if (sort === "ID") return <LoginInputS placeholder="아이디를 입력해 주세요" className={isdefault ? "" : "failed"} value={value} onChange={(e) => setValue(e.target.value)} />;

  return <LoginInputS placeholder="비밀번호를 입력해 주세요" className={isdefault ? "" : "failed"} type={true ? "password" : "text"} value={value} onChange={(e) => setValue(e.target.value)} />;
};

/** 2023-08-24 LogIn.tsx - 로그인 / 회원가입 배너 */
const LoginOuterContainerS = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 1rem;
`;

/** 2023-08-24 LogIn.tsx - 로그인 입력폼 */
const LoginFormS = styled.form`
  display: flex;
  flex-direction: column;
  height: 13.75rem;
  width: 100%;

  p.error {
    color: var(--system-red);
  }
`;

const LoginContainerS = styled.div`
  height: 9.28438rem;
  margin-bottom: 0.97rem;
`

/** 2023-08-24 LogIn.tsx - 로그인 입력 컨테이너 */
const LoginInnerContainerS = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  margin-bottom: 0.47rem;
`;

/** 2023-08-24 LogIn.tsx - 회원가입 유도 */
const NudgeSignS = styled.div`
  margin-top: 4.25rem;
  display: flex;
  justify-content: center;
  p {
    font-size: 0.875rem;

    &.hoxy {
      color: var(--font-color3);
      margin-right: 0.4rem;
    }
  }
  .img {
    width: 0.75rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  img {
    margin-top: 0.3rem;
  }
`;

/* <LoginInputS placeholder="아이디를 입력해 주세요" className={isDefault ? "" : "failed"} />
        <LoginInputS placeholder="비밀번호를 입력해 주세요" className={isDefault ? "" : "failed"} type={isDefault ? "password" : "text"} /> */

/* <LoginInputPWS className={isDefault ? "" : "failed"}>
          <input placeholder="비밀번호를 입력해 주세요" type={showPassword ? "text" : "password"} value={password} onChange={handlePasswordChange} />
          <button onClick={handleToggleShowPassword}>{showPassword ? "H" : "S"}</button>
        </LoginInputPWS> */

/** 2023-08-24 LogIn.tsx - 로그인 비밀번호 */
/*
const LoginInputPWS = styled.div`
display: flex;
justify-content: space-between;

padding: 1rem;
border: 0.1rem solid;
border-radius: 0.5rem;

&:focus-within {
  outline: 0.15rem solid;
  border: none;
}
&.failed {
  border-color: var(--system-red);
}

input {
  font-size: 1rem;
  border: none;
  &:focus {
    outline: none;
  }
}
`;
*/
