import styled from 'styled-components';
import { ReactComponent as CloseIcon } from '../../image/Icon/close_icon.svg';
import MarkDown from '../../Component/Markdown/Markdown';
import { terms } from '../../data/termsPolicyData';

interface TermsModalProps {
  setshowTerms: React.Dispatch<React.SetStateAction<boolean>>;
}

const TermsModal = ({ setshowTerms }: TermsModalProps) => {
  const handleCloseButtonClick = () => {
    setshowTerms(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <Container>
      <ModalHeaderS>
        <CloseIcon onClick={handleCloseButtonClick} />
        <h2>{terms.title}</h2>
      </ModalHeaderS>
      <MarkDown source={terms.contents} className='modal_contents' />
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
  z-index: 20;
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
