import styled from 'styled-components';
import { cssTransition } from 'react-toastify';

export const ErrorMsgNetS = styled.div`
  display: flex;
  align-items: center;
  gap: 0.37rem;

  img {
    width: 3rem;
    height: 1.59675rem;
  }
`;

export const fade = cssTransition({
  enter: 'fade-in',
  exit: 'fade-out',
  collapseDuration: 200,
});
