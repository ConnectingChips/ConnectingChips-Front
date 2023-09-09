import { styled } from "styled-components";
import { Arrow_Left_B } from "../../Component/ArrowBarrel";

/** 2023-08-27 Loginheader.tsx - 로그인/회원가입 헤더 */
const Loginheader = ({ type }: { type: "로그인" | "회원가입" }) => {
  return (
    <LoginheaderS>
      <div className="back">
        <img src={Arrow_Left_B} onClick={goBack} alt="Arrow icon" />
      </div>
      <h2>{type}</h2>
    </LoginheaderS>
  );
};

export default Loginheader;

/** 2023-08-27 Loginheader.tsx - 로그인/회원가입 헤더 */
const LoginheaderS = styled.header`
  align-self: start;
  margin-left: 1rem;

  .back {
    cursor: pointer;

    width: 1.75rem;
    margin-right: 5.95rem;
    display: flex;
    justify-content: center;
  }
  h2 {
    width: 6.31513rem;
    display: flex;
    justify-content: center;
  }
`;

/** 2023-08-25 Loginheader.tsx - 뒤로가기 핸들러 */
const goBack = (): void => {
  window.history.back();
};
