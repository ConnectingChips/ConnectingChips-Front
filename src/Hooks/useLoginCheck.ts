import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import scrollTop from "./scrollTop";

/** 2023-08-28 LogIn.tsx - state:현재 상태 - Done: 로그인, None:비 로그인 / scroll 함수 */
const useLoginCheck = (navigate: ReturnType<typeof useNavigate>, state: string) => {
  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    const setReg = state === "Done" ? access_token : access_token === null;

    if (setReg !== null) navigate(-1);

    scrollTop();
  }, [navigate, state]);
};

export default useLoginCheck;
