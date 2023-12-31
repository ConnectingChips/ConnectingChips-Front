import { styled } from 'styled-components';

/** 2023-08-24 SignUp.tsx - 로그인 요청 버튼 */
const SignClearBtnS = styled.button`
  height: var(--height-header);
  background-color: var(--color-main);
  border-radius: 2rem;
  font-size: 1rem;
`;

/** 2023-08-24 SignUp.tsx - 로그인 요청 버튼 */
const SignNotClearBtnS = styled.button`
  height: var(--height-header);
  background-color: var(--color-disabled2);
  border-radius: 2rem;
  font-size: 1rem;
  color: var(--color-disabled1);
`;

export { SignClearBtnS, SignNotClearBtnS };
