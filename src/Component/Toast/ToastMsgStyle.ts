import styled from 'styled-components';
import { cssTransition } from 'react-toastify';

export const ErrorMsgNetS = styled.div`
  display: flex;
  align-items: center;
  gap: 0.37rem;

  img {
    width: 45px;
    height: 44px;
  }
`;

export const fade = cssTransition({
  enter: 'fade-in',
  exit: 'fade-out',
  collapseDuration: 200,
});
