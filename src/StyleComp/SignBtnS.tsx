import { styled } from "styled-components";

/** 2023-08-24 SignUp.tsx - 로그인 요청 버튼 */
const SignClearBtnS = styled.button`
  height: var(--height-banner);
  background-color: var(--color-main);
  border-radius: 2rem;
  p {
    font-size: 1rem;
    cursor: pointer;
  }
`;

/** 2023-08-24 SignUp.tsx - 로그인 요청 버튼 */
const SignNotClearBtnS = styled.button`
  height: var(--height-banner);
  background-color: var(--color-disabled2);
  border-radius: 2rem;
  cursor: default;
  p {
    font-size: 1rem;
    color: var(--color-disabled1);
  }
`;

export { SignClearBtnS, SignNotClearBtnS };
