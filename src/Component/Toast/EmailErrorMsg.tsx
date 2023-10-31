import error_Icon from '../../image/error_chips.png';
import { toast } from 'react-toastify';
import { ErrorMsgNetS, fade, IconWrapper } from './ToastMsgStyle';

export const emailErr = () =>
  toast(EmailErrorMsg, {
    className: 'client-error',
    transition: fade,
  });

const EmailErrorMsg = () => {
  return (
    <ErrorMsgNetS>
      <IconWrapper>
        <img src={error_Icon} alt='error_Icon' className='error_icon' />
      </IconWrapper>
      <div>
        인증을 완료하기 위해, 메일함을 확인하여
        <br />
        이메일 인증하기 버튼을 눌러 주세요.
      </div>
    </ErrorMsgNetS>
  );
};
