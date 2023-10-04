import ConfirmModal from './ConfirmModal';

const DeleteModal = ({
  modalBind,
  deleteAction,
}: {
  modalBind: {
    modalBtn: boolean;
    setModalBtn: React.Dispatch<React.SetStateAction<boolean>>;
  };
  deleteAction: () => Promise<void>;
}) => {
  const { modalBtn, setModalBtn } = modalBind;

  return modalBtn ? (
    <ConfirmModal
      setConfirm={setModalBtn}
      confirmText='이 댓글을 삭제할까요?'
      action='삭제'
      method={deleteAction().then(setRefresh(refresh + 1)).then}
    />
  ) : (
    <></>
  );
};

export default DeleteModal;
