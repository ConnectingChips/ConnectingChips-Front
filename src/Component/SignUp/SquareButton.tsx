import { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

export const SquareButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <Button {...props} />;
};

const Button = styled.button`
  padding: 16px 23px;
  border-radius: 10px;
  font-size: 16px;
  line-height: 1.5;
  background-color: var(--color-main);
`;
