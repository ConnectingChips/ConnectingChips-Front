import { useState } from "react";

type handlerBind = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
};

/** 2023-08-24 SignUp - useSignup 리턴타입 */
interface useSignupType {
  nickname: string,
  password: string,
  confirmPassword: string,
  
  nicknameBind: handlerBind;
  passBind: handlerBind;
  confirmBind: handlerBind;
}

/** 2023-08-24 SignUp - 회원가입 입력값 Hooks */
const useSignup = (): useSignupType => {
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const nicknameBind = { value: nickname, setValue: setNickname };
  const passBind = { value: password, setValue: setPassword };
  const confirmBind = { value: confirmPassword, setValue: setConfirmPassword };

  return { nickname, nicknameBind, password, passBind, confirmPassword, confirmBind };
};

export { type handlerBind, useSignup };
