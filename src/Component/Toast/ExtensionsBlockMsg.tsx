import error_Icon from '../../image/error_Icon.png';
import { toast } from 'react-toastify';
import { ErrorMsgNetS, fade } from './ToastMsgStyle';

export const notifyExtensionsBlockErr = () =>
  toast(ExtensionsBlockMsg, {
    className: 'client-error',
    transition: fade,
  });

const ExtensionsBlockMsg = () => {
  return (
    <ErrorMsgNetS>
      <img src={error_Icon} alt='error_Icon' />
      <div>동영상은 올릴 수 없어요</div>
    </ErrorMsgNetS>
  );
};
