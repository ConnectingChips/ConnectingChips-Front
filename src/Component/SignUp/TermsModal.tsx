import styled from 'styled-components';
import { ReactComponent as CloseIcon } from '../../image/Icon/close_icon.svg';

interface TermsModalProps {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: {
    title: string;
    contents: string;
  };
}
const TermsModal = ({ setIsOpen, data }: TermsModalProps) => {
  const handleCloseButtonClick = () => {
    setIsOpen(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <Container>
      <ModalHeaderS>
        <CloseIcon onClick={handleCloseButtonClick} />
        <h2>{data.title}</h2>
      </ModalHeaderS>
      <ModalContentS className='modal_contents'>
        <p>{data.contents}</p>
      </ModalContentS>
      <ButtonWrapperS>
        <button>동의</button>
      </ButtonWrapperS>
    </Container>
  );
};

export default TermsModal;

const Container = styled.div`
  width: 100%;
  height: 100dvh;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--color-bg);
`;

const ModalHeaderS = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 23.4375rem;
  height: 3.5rem;
  font-size: 1.25rem;
  font-weight: 500;
  background-color: var(--color-bg);
  position: relative;

  svg {
    position: absolute;
    top: 50%;
    left: 1rem;
    transform: translateY(-50%);
  }
`;

const ModalContentS = styled.div`
  max-height: 90vh;
  overflow-y: auto;

  p {
    height: 100%;
    padding: 1rem 1rem 5.5rem 1rem;
  }
`;

const ButtonWrapperS = styled.div`
  padding: 1rem;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: var(--color-bg);

  button {
    width: 100%;
    height: 3.5rem;
    border-radius: 1.875rem;
    background-color: var(--color-main);
    color: var(--font-color1);
    font-size: 1rem;
  }
`;
