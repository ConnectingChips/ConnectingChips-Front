import React from 'react';
import styled from 'styled-components';
import UploadWrapperS from '../../StyleComp/UploadWrapperS';

interface UploadTextProp {
  initialText: string;
  handleTextareaChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const UploadText = ({ initialText, handleTextareaChange }: UploadTextProp) => {
  return (
    <UploadTextWrapperS>
      <h2>오늘의 작심은 어땠나요?</h2>
      <textarea placeholder={initialText} maxLength={800} onChange={handleTextareaChange} />
    </UploadTextWrapperS>
  );
};

export default UploadText;

const UploadTextWrapperS = styled(UploadWrapperS)`
  textarea {
    resize: none;
    height: 16.3125rem;
    border: 1px solid #e3e3e3;
    border-radius: 1rem;
    outline: none;
  }
`;
