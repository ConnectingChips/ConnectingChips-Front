import error_Icon from '../../image/error_chips.png';
import { toast } from 'react-toastify';
import { ErrorMsgNetS, fade, IconWrapper } from './ToastMsgStyle';

export const notifyNetErr = () =>
  toast(NetworkErrorMsg, {
    className: 'net-error',
    transition: fade,
  });

const NetworkErrorMsg = () => {
  return (
    <ErrorMsgNetS>
      <IconWrapper>
        <img src={error_Icon} alt='error_Icon' className='error_icon' />
      </IconWrapper>
      <div>
        네트워크 연결 상태가 좋지 않습니다.
        <br />
        확인 후 다시 시도해 주세요.
      </div>
    </ErrorMsgNetS>
  );
};
