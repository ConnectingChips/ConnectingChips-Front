import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

type ConfirmProps = { setConfirm: React.Dispatch<React.SetStateAction<boolean>> };

const ConfirmModal = ({ setConfirm }: ConfirmProps): JSX.Element => {
  const navigate = useNavigate();
  return (
    <ConfirmBGS onClick={() => setConfirm(false)}>
      <ConfirmModalS onClick={(e) => e.stopPropagation()}>
        <h2>로그아웃하시겠습니까?</h2>
        <div>
          <button className='cancel' onClick={() => setConfirm(false)}>
            취소
          </button>
          <button
            className='point'
            onClick={() => {
              localStorage.clear();
              navigate(-1);
            }}
          >
            로그아웃
          </button>
        </div>
      </ConfirmModalS>
    </ConfirmBGS>
  );
};

export default ConfirmModal;

const ConfirmBGS = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

const ConfirmModalS = styled.div`
  background: #fff;
  width: 18.5rem;
  height: 8.875rem;
  border-radius: 0.625rem;

  display: flex;
  flex-direction: column;
  overflow: hidden;

  div {
    /* height: 2.5rem; */
    display: flex;

    button {
      width: 100%;
      font-size: 0.75rem;
      padding: 0.62rem 0;

      &.cancel {
        background-color: var(--color-bg);
      }

      &.point {
        background-color: var(--color-main);
      }
    }
  }

  h2 {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1rem;
  }
`;
