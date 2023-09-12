import styled from 'styled-components';
import { termsAndConditions, privacyPolicyAgreement } from './terms_data';

import Dropdown from './Dropdown';

// TODO: Title 컴포넌트 분리
const Terms = (): JSX.Element => {
  return (
    <div>
      <DividerS />
      <TermsTitleWrapperS>
        <TermsTitleS>
          <input type='checkbox' />
          <strong>약관 전체 동의</strong>
        </TermsTitleS>
      </TermsTitleWrapperS>
      <Dropdown data={termsAndConditions} />
      <Dropdown data={privacyPolicyAgreement} />
    </div>
  );
};

export default Terms;

const DividerS = styled.div`
  width: 100%;
  height: 0.5rem;
  background-color: var(--color-line);
`;

// TODO: Title styled-components 분리 필요
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
