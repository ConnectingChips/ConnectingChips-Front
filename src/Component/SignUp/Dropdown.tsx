import styled from 'styled-components';
import { ReactComponent as ArrowIcon } from '../../image/Icon/Arrow/Arrow_icon_Up.svg';
import { useState } from 'react';

interface DropdownProps {
  data: {
    title: string;
    contents: string;
  };
}

const Dropdown = ({ data }: DropdownProps) => {
  const { title, contents } = data;
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <TermsTitleWrapperS>
        <TermsTitleS>
          <input type='checkbox' />
          <strong>{title}</strong>
        </TermsTitleS>
        <IconTouchAreaS onClick={() => setIsOpen(!isOpen)}>
          <ArrowIcon />
        </IconTouchAreaS>
      </TermsTitleWrapperS>
      <TermsContentS className={isOpen ? 'open' : ''}>
        <p>{contents}</p>
      </TermsContentS>
    </div>
  );
};

export default Dropdown;

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

const TermsContentS = styled.div`
  display: none;
  height: 7.25rem;
  padding: 1rem;
  background: var(--color-bg);
  overflow-y: scroll;

  p {
    color: var(--font-color2);
    font-size: 0.875rem;
  }

  &.open {
    display: block;
  }
`;

const IconTouchAreaS = styled.div`
  display: flex;
  justify-content: right;
  align-items: center;
  flex-shrink: 0;
  width: 2rem;
  height: 2rem;
  cursor: pointer;
`;
