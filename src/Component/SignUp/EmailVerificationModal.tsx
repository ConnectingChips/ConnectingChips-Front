import { useEffect } from 'react';
import styled from 'styled-components';
import EmailVerificationContents from './EmailVerificationContents';
import { ReactComponent as CloseIcon } from '../../image/Icon/close_icon.svg';

interface EmailVerificationModalProps {
  email: string;
}

const EmailVerificationModal = ({ email }: EmailVerificationModalProps) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleCloseButtonClick = () => {
    // TODO: add modal close code...
  };

  return (
    <ContainerS>
      <ModalHeaderS>
        <CloseIcon onClick={handleCloseButtonClick} />
        <h2>메일 인증하기</h2>
      </ModalHeaderS>
      <EmailVerificationContents />
      <ButtonWrapperS>
        <button>인증 완료</button>
      </ButtonWrapperS>
    </ContainerS>
  );
};

export default EmailVerificationModal;

const ContainerS = styled.div`
  width: 100%;
  height: 100dvh;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 200;
  background-color: var(--color-white);
`;

const ModalHeaderS = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 23.4375rem;
  height: 3.5rem;
  font-size: 1.25rem;
  font-weight: 500;
  background-color: var(--color-white);
  position: relative;

  svg {
    position: absolute;
    top: 50%;
    left: 1rem;
    transform: translateY(-50%);
  }
`;

const ButtonWrapperS = styled.div`
  padding: 1rem;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--color-white);

  button {
    width: 100%;
    height: 3.5rem;
    border-radius: 1.875rem;
    background-color: var(--color-main);
    color: var(--font-color1);
    font-size: 1rem;
  }
`;
