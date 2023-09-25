import { useEffect, useState } from 'react';
import styled from 'styled-components';
import TermsModal from './TermsModal';
import { terms, privacyPolicy, personalInfoCollection } from '../../data/termsPolicyData';

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
    privacyPolicy: false,
    personalInfoCollection: false,
  });

  useEffect(() => {
    const isAllChecked = Object.values(isAgreed).every((value) => value === true);
    setIsAllAgreed(isAllChecked);
  }, [isAgreed, setIsAllAgreed]);

  const handleAllAgreedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setIsAgreed(() => ({
      terms: checked,
      privacyPolicy: checked,
      personalInfoCollection: checked,
    }));
    setIsAllAgreed(checked);
  };

  const handleAgreedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    setIsAgreed((prev) => ({ ...prev, [id]: checked }));
    const allChecked = Object.values({ ...isAgreed, [id]: checked }).every(
      (value) => value === true,
    );
    setIsAllAgreed(allChecked);
  };

  const handleDetailClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const buttonId = e.currentTarget.id;

    if (buttonId === 'terms') {
      setTermsData(terms);
    } else if (buttonId === 'privacyPolicy') {
      setTermsData(privacyPolicy);
    } else if (buttonId === 'personalInfoCollection') {
      setTermsData(personalInfoCollection);
    }

    showModal();
  };

  const showModal = () => {
    setIsOpen(true);
    // document.body.style.overflow = 'hidden';
  };

  return (
    <>
      <DividerS />
      <TermsTitleWrapperS>
        <TermsTitleS>
          <input type='checkbox' id='all' checked={isAllAgreed} onChange={handleAllAgreedChange} />
          <label htmlFor='all' className='terms_title'>
            약관 전체 동의
          </label>
        </TermsTitleS>
      </TermsTitleWrapperS>

      <TermsTitleWrapperS>
        <TermsTitleS>
          <input
            type='checkbox'
            id='terms'
            checked={isAgreed.terms}
            onChange={handleAgreedChange}
          />
          <label htmlFor='terms'>이용약관 동의&#40;필수&#41;</label>
        </TermsTitleS>
        <ViewDetailsButtonS type='button' id='terms' onClick={handleDetailClick}>
          보기
        </ViewDetailsButtonS>
      </TermsTitleWrapperS>

      <TermsTitleWrapperS>
        <TermsTitleS>
          <input
            type='checkbox'
            id='privacyPolicy'
            checked={isAgreed.privacyPolicy}
            onChange={handleAgreedChange}
          />
          <label htmlFor='privacyPolicy'>개인정보 처리 방침 동의&#40;필수&#41;</label>
        </TermsTitleS>
        <ViewDetailsButtonS type='button' id='privacyPolicy' onClick={handleDetailClick}>
          보기
        </ViewDetailsButtonS>
      </TermsTitleWrapperS>

      <TermsTitleWrapperS>
        <TermsTitleS>
          <input
            type='checkbox'
            id='personalInfoCollection'
            checked={isAgreed.personalInfoCollection}
            onChange={handleAgreedChange}
          />
          <label htmlFor='personalInfoCollection'>개인정보 수집 및 이용 동의&#40;필수&#41;</label>
        </TermsTitleS>
        <ViewDetailsButtonS type='button' id='personalInfoCollection' onClick={handleDetailClick}>
          보기
        </ViewDetailsButtonS>
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

  .terms_title {
    font-weight: 500;
  }
`;

const ViewDetailsButtonS = styled.button`
  color: var(--font-color3);
  font-size: var(--body-b);
`;
