import styled from 'styled-components';

type ConfirmProps = {
  setConfirm: React.Dispatch<React.SetStateAction<boolean>>;
  confirmText: string;
  action: string;
  method: () => Promise<any>;
  refreshBind: {
    refresh: number;
    setRefresh: React.Dispatch<React.SetStateAction<number>>;
  };
};

const DeleteModal = ({
  setConfirm,
  confirmText,
  action,
  method,
  refreshBind,
}: ConfirmProps): JSX.Element => {
  const { refresh, setRefresh } = refreshBind;
  return (
    <ConfirmBGS onClick={() => setConfirm(false)}>
      <ConfirmModalS onClick={(e) => e.stopPropagation()}>
        <h2>{confirmText}</h2>
        <div>
          <button className='cancel' onClick={() => setConfirm(false)}>
            취소
          </button>
          <button
            className='point'
            onClick={() => {
              setConfirm(false);
              method();
              setRefresh(refresh + 1);
            }}
          >
            {action}
          </button>
        </div>
      </ConfirmModalS>
    </ConfirmBGS>
  );
};

export default DeleteModal;

const ConfirmBGS = styled.div`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000; /* 다른 요소 위에 놓기 위한 z-index 값 */

  /* 스크롤이 있을 때도 화면 크기에 맞게 적용되도록 */
  overflow: auto;
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
      font-size: var(--button-mid);
      padding: 0.62rem 0;

      &.cancel {
        background-color: var(--color-line);
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
