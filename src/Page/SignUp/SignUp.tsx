import { styled, useEffect, useState, useNavigate, useLoginCheck } from "./SignUpBarrel";
import { Banner, LogInS, LoginInputS, SignClearBtnS, SignNotClearBtnS, Loginheader, infoIcon } from "./SignUpBarrel";
import { type handlerBind, useSignup } from "./SignUpBarrel";

/** 2023-08-24 SignUp - 회원가입 페이지 */
const SignUp = (): JSX.Element => {
  const [isValid, setIsValid] = useState(true);
  const [inputState, setInputState] = useState("default");
  const isFailed = inputState === "failed";
  const { nickname, nicknameBind, password, passBind, confirmPassword, confirmBind } = useSignup();
  const navigate = useNavigate();

  useLoginCheck(navigate,'Done');

  useEffect(() => {
    const isValidArr = [false, false, false];

    const idReg = /^(?!^\d+$)[a-zA-Z0-9]{2,10}$/;
    const passReg = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{10,20}$/;

    /** 2023-08-24 SignUp.tsx  조건 중 하나라도 안맞을시 false로 바꾸는 함수 */
    const setFalse = (index: number) => {
      setIsValid(false);
      isValidArr[index] = false;
    };

    // id는 영문, 영문+숫자 중 1가지 2~10자 조합, 공백 불가
    if (idReg.test(nickname) && nickname.length <= 10) isValidArr[0] = true;
    else return setFalse(0);

    // pw는 영문+숫자 10~20자 조합, 공백 불가
    if (passReg.test(password) === true) isValidArr[1] = true;
    else return setFalse(1);

    // pw는 pwconfirm과 동일해야함
    if (password === confirmPassword) isValidArr[2] = true;
    else return setFalse(2);

    const findFalse = isValidArr.find((isvalid) => isvalid === false);
    if (findFalse === undefined) setIsValid(true);
  }, [nickname, password, confirmPassword]);

  /** 2023-08-24 SignUp.tsx - 로그인 요청 핸들러 */
  const SignupSubmit = async (e: React.MouseEvent<HTMLFormElement, MouseEvent>): Promise<void> => {
    e.preventDefault();
    try {
      // await axios.post("/users/sign-up", {
      //   nickname,
      //   password,
      //   confirmPassword,
      // });
      navigate("/LogIn");
    } catch (error) {
      console.error("회원가입 오류: ", error);
      setInputState("failed");
    }
  };

  return (
    <LogInS>
      <Loginheader type="회원가입" />
      <Banner />
      <LoginFormS onSubmit={SignupSubmit}>
        <LoginInputContainerS>
          <h2>아이디</h2>
          <SignUpInput sort="ID" handlerBind={nicknameBind} isFailed={isFailed} />
          {!isFailed && (
            <p>
              <img src={infoIcon} alt="infoIcon" />
              영문, 영문+숫자 중 1가지 2~10자 조합, 공백 불가
            </p>
          )}
          {isFailed && <p className="error">이미 존재하는 아이디입니다</p>}
        </LoginInputContainerS>
        <LoginInputContainerS>
          <h2>비밀번호</h2>
          <SignUpInput sort="PW" handlerBind={passBind} />
          <p>
            <img src={infoIcon} alt="infoIcon" />
            영문+숫자 10~20자 조합, 공백 및 특수문자 불가
          </p>
        </LoginInputContainerS>
        <LoginInputContainerS>
          <h2>비밀번호 확인</h2>
          <SignUpInput sort="PW" handlerBind={confirmBind} />
        </LoginInputContainerS>

        {isValid ? (
          <SignClearBtnS type="submit">
            <p>회원가입</p>
          </SignClearBtnS>
        ) : (
          <SignNotClearBtnS type="submit">
            <p>회원가입</p>
          </SignNotClearBtnS>
        )}
      </LoginFormS>
    </LogInS>
  );
};

export default SignUp;

/** 2023-08-24 SignUp.tsx - 입력창 props */
interface SignUpInputProps {
  sort: "ID" | "PW";
  handlerBind: handlerBind;
  isFailed?: boolean;
}

/**
 * 2023-08-24 SignUp.tsx - 입력 창
 * @param sort id인지 password인지 식별
 * @returns id입력창 또는 pw입력창
 */
const SignUpInput = ({ sort, handlerBind, isFailed }: SignUpInputProps): JSX.Element => {
  const { value, setValue } = handlerBind;
  const handlerOnChange = (e: React.ChangeEvent<HTMLInputElement>) => setValue(e.target.value);

  if (sort === "ID") return <LoginInputS placeholder="닉네임과 동일하게 적용됩니다" className={isFailed ? "failed" : ""} value={value} onChange={handlerOnChange} />;

  return <LoginInputS placeholder="비밀번호를 확인해 주세요" type="password" className={isFailed ? "failed" : ""} value={value} onChange={handlerOnChange} />;
};

/** 2023-08-24 LogIn.tsx - 로그인 입력폼 */
const LoginFormS = styled.form`
  display: flex;
  flex-direction: column;
  height: 28.875rem;
  width: 100%;
  gap: 0.95rem;
`;

/** 2023-08-24 LogIn.tsx - 로그인 입력 컨테이너 */
const LoginInputContainerS = styled.div`
  height: 7.5rem;
  display: flex;
  flex-direction: column;
  gap: var(--height-gap);

  p {
    color: var(--font-color2);

    img {
      margin-right: 0.25rem;
    }

    &.error {
      color: var(--system-red);
    }
  }
`;
