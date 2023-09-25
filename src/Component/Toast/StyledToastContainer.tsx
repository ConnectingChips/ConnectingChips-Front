import styled from 'styled-components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const StyledToastContainer = (): JSX.Element => {
  return (
    <StyledContainer
      position='bottom-center'
      hideProgressBar={true}
      closeButton={false}
      autoClose={3000}
      limit={2}
    />
  );
};

const StyledContainer = styled(ToastContainer)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;

  &&.Toastify__toast-container {
    padding-bottom: 88px;
    font-size: var(--body-c);
  }

  .Toastify__toast-body {
    padding: 0;
    margin: 0;
  }

  .Toastify__toast {
    min-height: 0;
    padding: 8px 16px;
    margin-bottom: 0;
  }

  .net-error,
  .client-error {
    min-width: 17.5625rem;
    border-radius: 0.625rem;
    color: white;
    font-size: var(--body-c);
    font-weight: 400;
    font-family: Noto Sans KR;
    background-color: rgba(0, 0, 0, 0.6);
  }

  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  @keyframes fade-out {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  .fade-in {
    animation: fade-in 0.5s ease-in-out both;
  }
  .fade-out {
    animation: fade-out 0.5s ease-in-out both;
  }
`;
