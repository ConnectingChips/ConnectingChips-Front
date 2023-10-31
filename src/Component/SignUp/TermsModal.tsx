import { useEffect } from 'react';
import styled from 'styled-components';
import MarkDown from '../Markdown/Markdown';
import { GroupHeader } from '../../Component/Mission/GroupHeader';

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
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

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
    // document.body.style.overflow = 'unset';
  };

  return (
    <Container>
      <GroupHeader btnType='close' text={termsData.title} btnState={setIsOpen} />
      <MarkDown source={termsData.contents} className='modal_contents' />
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
  z-index: 120;
  background-color: var(--color-white);
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
