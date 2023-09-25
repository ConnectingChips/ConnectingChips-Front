import welcomeIcon from '../../image/welcome_chips.png';
import { toast } from 'react-toastify';
import { ErrorMsgNetS, fade } from './ToastMsgStyle';

export const notifySignUp = () =>
  toast(SignUpMsg, {
    className: 'client-error',
    transition: fade,
  });

const SignUpMsg = () => {
  return (
    <ErrorMsgNetS>
      <img src={welcomeIcon} alt='welcome icon' className='welcome_icon' />
      <div>
        새로운 칩스의 가입을 환영합니다!
        <br />
        로그인하여 작심월드에 입장해 주세요!
      </div>
    </ErrorMsgNetS>
  );
};
