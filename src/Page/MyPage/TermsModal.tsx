import styled from 'styled-components';
import { ReactComponent as CloseIcon } from '../../image/Icon/close_icon.svg';
import MarkDown from '../../Component/Markdown/Markdown';
import { personalInfoCollection, privacyPolicy, terms } from '../../data/termsPolicyData';
import Bind from '../../Type/Bind';
import TermsValue from '../../Type/TermsValue';

interface TermsModalProps {
  termsBind: Bind<TermsValue>;
}

const TermsModal = ({ termsBind }: TermsModalProps) => {
  const { state: showTerms, Setter: setshowTerms } = termsBind;
  const handleCloseButtonClick = () => {
    setshowTerms('');
    document.body.style.overflow = 'unset';
  };

  const termType: { type: string; title: string; contents: string } =
    showTerms === '이용약관'
      ? terms
      : showTerms === '개인정보 처리 방침'
      ? privacyPolicy
      : showTerms === '개인정보 수집 및 이용 동의'
      ? personalInfoCollection
      : { type: '', title: '', contents: '' };

  return (
    <Container>
      <ModalHeaderS>
        <CloseIcon onClick={handleCloseButtonClick} />
        <h2>{termType.title}</h2>
      </ModalHeaderS>
      <MarkDown source={termType.contents} className='modal_contents' />
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
  z-index: 20;
  background-color: var(--color-white);
`;

const ModalHeaderS = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
