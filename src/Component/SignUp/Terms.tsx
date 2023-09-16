import { useEffect, useState } from 'react';
import styled from 'styled-components';
import TermsModal from './TermsModal';
import { termsAndConditions, privacyPolicyAgreement } from './terms_data';
import { Arrow_Left_B } from '../ArrowBarrel';

interface TermsProps {
  isAllAgreed: boolean;
  setIsAllAgreed: React.Dispatch<React.SetStateAction<boolean>>;
}

interface TermsData {
  type: string;
  title: string;
  contents: string;
}

const Terms = ({ isAllAgreed, setIsAllAgreed }: TermsProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(false);
  const [termsData, setTermsData] = useState<TermsData>({ title: '', contents: '', type: '' });
  const [isAgreed, setIsAgreed] = useState({
    terms: false,
    privacy: false,
  });

  useEffect(() => {
    const isAllChecked = Object.values(isAgreed).every((value) => value === true);
    setIsAllAgreed(isAllChecked);
  }, [isAgreed, setIsAllAgreed]);

  const handleAllAgreedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setIsAgreed(() => ({ terms: checked, privacy: checked }));
    setIsAllAgreed(checked);
  };

  const handleAgreedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setIsAgreed((prev) => ({ ...prev, [name]: checked }));
    const allChecked = Object.values({ ...isAgreed, [name]: checked }).every(
      (value) => value === true,
    );
    setIsAllAgreed(allChecked);
  };

  const handleTermsDetailClick = () => {
    setTermsData(termsAndConditions);
    showModal();
  };

  const handlePrivacyDetailClick = () => {
    setTermsData(privacyPolicyAgreement);
    showModal();
  };

  const showModal = () => {
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  return (
    <>
      <DividerS />
      <TermsTitleWrapperS>
        <TermsTitleS>
          <input
            type='checkbox'
            name='all'
            checked={isAllAgreed}
            onChange={handleAllAgreedChange}
          />
          <strong>약관 전체 동의</strong>
        </TermsTitleS>
      </TermsTitleWrapperS>
      <TermsTitleWrapperS>
        <TermsTitleS>
          <input
            type='checkbox'
            name='terms'
            checked={isAgreed.terms}
            onChange={handleAgreedChange}
          />
          <strong>이용약관 동의&#40;필수&#41;</strong>
        </TermsTitleS>
        <ArrowRIghtIconS onClick={handleTermsDetailClick}>
          <img src={Arrow_Left_B} alt='상세보기' />
        </ArrowRIghtIconS>
      </TermsTitleWrapperS>
      <TermsTitleWrapperS>
        <TermsTitleS>
          <input
            type='checkbox'
            name='privacy'
            checked={isAgreed.privacy}
            onChange={handleAgreedChange}
          />
          <strong>개인정보 수집 및 이용 동의&#40;필수&#41;</strong>
        </TermsTitleS>
        <ArrowRIghtIconS onClick={handlePrivacyDetailClick}>
          <img src={Arrow_Left_B} alt='상세보기' />
        </ArrowRIghtIconS>
      </TermsTitleWrapperS>
      {isOpen && (
        <TermsModal setIsOpen={setIsOpen} termsData={termsData} setIsAgreed={setIsAgreed} />
      )}
    </>
  );
};

export default Terms;

const DividerS = styled.div`
  width: 100%;
  height: 0.5rem;
  background-color: var(--color-line);
`;

const TermsTitleWrapperS = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3.5rem;
  padding: 0 1rem;
  border-bottom: 0.0625rem solid var(--color-line);
  background-color: #fff;
`;

const TermsTitleS = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  input {
    appearance: none;
    margin: 0 0.46rem 0 0;
    width: 1.49738rem;
    height: 1.4375rem;
    border: 0.0625rem solid var(--color-disabled2);
    border-radius: 50%;
    cursor: pointer;
  }

  input:checked {
    border: 0.0625rem solid var(--font-color1);
    box-shadow: 0 0 0 0.375rem var(--font-color1) inset;
  }

  strong {
    color: var(--font-color1);
  }
`;

const ArrowRIghtIconS = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.25rem;
  height: 1.25rem;
  transform: rotate(180deg);

  img {
    transform: scale(0.8);
  }
`;
