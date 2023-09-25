import error_Icon from '../../image/error_chips.png';
import { toast } from 'react-toastify';
import { ErrorMsgNetS, fade, IconWrapper } from './ToastMsgStyle';

export const notifyImgSizeLimitErr = () =>
  toast(ImgSizeLimitMsg, {
    className: 'client-error',
    transition: fade,
  });

const ImgSizeLimitMsg = () => {
  return (
    <ErrorMsgNetS>
      <IconWrapper>
        <img src={error_Icon} alt='error_Icon' className='error_icon' />
      </IconWrapper>
      <div>
        이미지 용량을 초과하였습니다.
        <br />
        10MB 이하의 파일을 올려주세요.
      </div>
    </ErrorMsgNetS>
  );
};
