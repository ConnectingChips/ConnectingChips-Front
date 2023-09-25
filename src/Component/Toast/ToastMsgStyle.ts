import styled from 'styled-components';
import { cssTransition } from 'react-toastify';

export const ErrorMsgNetS = styled.div`
  display: flex;
  align-items: center;
  gap: 0.37rem;

  img.welcome_icon {
    width: 45px;
    height: 44px;
  }

  img.error_icon {
    width: 48px;
    height: 34px;
  }
`;

export const fade = cssTransition({
  enter: 'fade-in',
  exit: 'fade-out',
  collapseDuration: 200,
});

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 48px;
  height: 44px;
`;
