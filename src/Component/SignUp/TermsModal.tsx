import styled from 'styled-components';
import { ReactComponent as CloseIcon } from '../../image/Icon/close_icon.svg';
import MarkDown from './Markdown';

interface TermsModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  termsData: {
    type: string;
    title: string;
    contents: string;
  };
  setIsAgreed: React.Dispatch<
    React.SetStateAction<{
      terms: boolean;
      privacyPolicy: boolean;
      personalInfoCollection: boolean;
    }>
  >;
}

const TermsModal = ({ setIsOpen, termsData, setIsAgreed }: TermsModalProps) => {
  const handleCloseButtonClick = () => {
    setIsOpen(false);
    document.body.style.overflow = 'unset';
  };

  const handleAgreeButtonClick = () => {
    if (termsData.type === 'terms') {
      setIsAgreed((prev) => ({
        ...prev,
        terms: true,
      }));
    } else if (termsData.type === 'privacyPolicy') {
      setIsAgreed((prev) => ({
        ...prev,
        privacyPolicy: true,
      }));
    } else if (termsData.type === 'personalInfoCollection') {
      setIsAgreed((prev) => ({
        ...prev,
        personalInfoCollection: true,
      }));
    }

    setIsOpen(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <Container>
      <ModalHeaderS>
        <CloseIcon onClick={handleCloseButtonClick} />
        <h2>{termsData.title}</h2>
      </ModalHeaderS>
      <ModalContentS>
        <MarkDown source={termsData.contents} className='modal_contents' />
      </ModalContentS>
      <ButtonWrapperS>
        <button onClick={handleAgreeButtonClick}>동의</button>
      </ButtonWrapperS>
    </Container>
  );
};

export default TermsModal;

const Container = styled.div`
  width: 100%;
  height: 100dvh;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
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

const ModalContentS = styled.div`
  max-height: calc(100dvh - 88px);
  overflow-y: auto;

  &.modal_contents {
    height: 100%;
  }

  p {
    font-size: 14px;
    margin-bottom: 7px;
  }

  li p {
    margin-bottom: 0;
  }

  ul,
  ol {
    margin: 0;
    padding-left: 16px;
  }

  ul {
    padding: 0;
    list-style-type: circle;
  }

  li {
    white-space: normal;
  }

  ol {
    list-style-type: decimal;
  }

  ol > li {
    list-style: number;
  }

  ol li p {
    margin: 0;
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
