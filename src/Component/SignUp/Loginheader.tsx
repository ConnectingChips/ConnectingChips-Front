import { styled } from 'styled-components';
import { Arrow_Left_B } from '../IconBarrel/ArrowBarrel';
import { goBack } from '../Mission/GroupHeader';

/** 2023-08-27 Loginheader.tsx - 로그인/회원가입 헤더 */
const Loginheader = ({ type }: { type: '로그인' | '회원가입' }) => {
  return (
    <LoginheaderS>
      <div className='back'>
        <img src={Arrow_Left_B} onClick={goBack} alt='Arrow icon' />
      </div>
      <h2>{type}</h2>
    </LoginheaderS>
  );
};

export default Loginheader;

/** 2023-08-27 Loginheader.tsx - 로그인/회원가입 헤더 */
const LoginheaderS = styled.header`
  align-self: start;
  padding-left: 1rem;

  .back {
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