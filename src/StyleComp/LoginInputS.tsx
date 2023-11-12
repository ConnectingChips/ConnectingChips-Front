import { styled } from 'styled-components';

/** 2023-08-24 LogIn.tsx - 로그인 페이지 스타일 */
const LogInS = styled.div`
  width: var(--width-mobile);
  height: 100%;
  display: flex;
  flex-direction: column;
`;

/** 2023-08-24 LoginInputS.tsx - 로그인 아이디 */
const LoginInputS = styled.input`
  padding: 16px 18px;
  border: 1px solid var(--color-disabled2);
  border-radius: 0.5rem;
  font-size: var(--body-a);
  line-height: 1.375;
  box-shadow: none;

  &.failed {
    border-color: var(--system-red);
  }

  &:focus {
    border-color: var(--color-main);
    outline: none;
  }
`;

export { LogInS, LoginInputS };
