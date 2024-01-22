import styled from 'styled-components';
import MarkDown from '../../Component/Markdown/Markdown';
import { personalInfoCollection, privacyPolicy, terms } from '../../data/termsPolicyData';
import Bind from '../../type/Bind';
import TermsValue from '../../type/TermsValue';
import { GroupHeader } from '../../Component/Mission/GroupHeader';
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
      <GroupHeader btnType='close' text={showTerms} btnState={handleCloseButtonClick} />
      <MarkDown source={termType.contents} className='modal_contents' />
    </Container>
  );
};

export default TermsModal;

const Container = styled.div`
  width: 100%;
  height: 100dvh;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 120;
  background-color: var(--color-white);
`;
