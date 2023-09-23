import { styled } from 'styled-components';

/** 2023-08-24 LogIn.tsx - 로그인 페이지 스타일 */
const LogInS = styled.div`
  width: var(--width-mobile);
  height: 100%;
  display: flex;
  flex-direction: column;

  /* border: 1px solid; */

  header {
    width: calc(var(--width-mobile) - 1rem);
    height: var(--height-banner);
    display: flex;
    justify-content: flex-start;
    align-items: center;
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
    background-color: var(--color-white);

    h2 {
      font-size: 1.25rem;
    }
  }
`;

/** 2023-08-24 LoginInputS.tsx - 로그인 아이디 */
const LoginInputS = styled.input`
  padding: 16px 18px;
  font-size: var(--body-b);
  border: 1px solid var(--color-disabled2);
  border-radius: 0.5rem;
  box-shadow: none;
  height: 1.25rem;

  &.failed {
    border-color: var(--system-red);
  }

  &:focus {
    border-color: var(--color-main);
    outline: none;
  }
`;

export { LogInS, LoginInputS };
