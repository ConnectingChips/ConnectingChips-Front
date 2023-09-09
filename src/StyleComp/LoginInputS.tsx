import { styled } from "styled-components";

/** 2023-08-24 LogIn.tsx - 로그인 페이지 스타일 */
const LogInS = styled.div`
  width: var(--width-mobile);
  height: 100%;
  display: flex;
  flex-direction: column;

  /* border: 1px solid; */

  header {
    height: var(--height-banner);
    display: flex;
    justify-content: center;
    align-items: center;

    h2 {
      font-size: 1.25rem;
    }
  }
`;

/** 2023-08-24 LoginInputS.tsx - 로그인 아이디 */
const LoginInputS = styled.input`
  padding: 1rem;
  font-size: 1rem;
  border: 0.1rem solid;
  border-radius: 0.5rem;
  /* margin: 0.5rem 0; */
  height: 1.5rem;

  &.failed {
    border-color: var(--system-red);
  }
`;

export { LogInS, LoginInputS };
