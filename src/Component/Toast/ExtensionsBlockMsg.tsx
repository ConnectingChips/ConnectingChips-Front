import error_Icon from '../../image/error_chips.png';
import { toast } from 'react-toastify';
import { ErrorMsgNetS, fade, IconWrapper } from './ToastMsgStyle';

export const notifyExtensionsBlockErr = () =>
  toast(ExtensionsBlockMsg, {
    className: 'client-error',
    transition: fade,
  });

const ExtensionsBlockMsg = () => {
  return (
    <ErrorMsgNetS>
      <IconWrapper>
        <img src={error_Icon} alt='error_Icon' className='error_icon' />
      </IconWrapper>
      <div>
        png, jpg, jpeg 형식의 파일만 지원하고
        <br />
        있습니다. 다시 업로드해 주세요.
      </div>
    </ErrorMsgNetS>
  );
};
