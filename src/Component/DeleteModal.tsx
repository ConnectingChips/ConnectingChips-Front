import ConfirmModal from './ConfirmModal';
import { useRecoilState } from 'recoil';
import { refreshState } from '../data/initialData';
import Bind from '../Type/Bind';

const DeleteModal = ({
  modalBind,
  deleteAction,
}: {
  modalBind: Bind<boolean>;
  deleteAction: () => Promise<void>;
}) => {
  const { state: modalBtn, Setter: setModalBtn } = modalBind;
  const [refresh, setRefresh] = useRecoilState<number>(refreshState);

  return modalBtn ? (
    <ConfirmModal
      setConfirm={setModalBtn}
      confirmText='이 댓글을 삭제할까요?'
      action='삭제'
      method={deleteAction}
    />
  ) : (
    <></>
  );
};

export default DeleteModal;
