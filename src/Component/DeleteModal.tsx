import ConfirmModal from './ConfirmModal';
import { useRecoilState } from 'recoil';
import { refreshState } from '../data/initialData';

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
  const [refresh, setRefresh] = useRecoilState<number>(refreshState);

  return modalBtn ? (
    <ConfirmModal
      setConfirm={setModalBtn}
      confirmText='이 댓글을 삭제할까요?'
      action='삭제'
      method={deleteAction().then(() => setRefresh(refresh + 1)).then}
    />
  ) : (
    <></>
  );
};

export default DeleteModal;
