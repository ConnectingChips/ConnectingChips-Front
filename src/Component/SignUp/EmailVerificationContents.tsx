import styled from 'styled-components';
import EmailVerificationMessage from './EmailVerificationMessage';
import ExclamationMarkChips from '../../image/exclamation-mark-chips.png';

const EmailVerificationContents = ({ email }: { email: string }) => {
  return (
    <ContainerS>
      <TextS>
        인증 메일이 발송되었어요! <br />
        {email}의 <br />
        메일함을 확인해 주세요.
      </TextS>
      <div>
        <ImageS>
          <img src={ExclamationMarkChips} alt='깜짝 놀란 칩스' />
        </ImageS>
        <EmailVerificationMessage />
      </div>
    </ContainerS>
  );
};

const ContainerS = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
  height: calc(100vh - 144px);
  padding: 1.25rem 1rem 2.5rem 1rem;
`;

const TextS = styled.p`
  color: var(--font-color1);
  font-size: 1.5rem;
  font-weight: 500;
`;

const ImageS = styled.div`
  width: 120px;
  margin: 0 auto 1.25rem auto;

  img {
    display: block;
    width: 100%;
    height: auto;
  }
`;

export default EmailVerificationContents;
