import error_Icon from '../../image/error_Icon.png';
import { cssTransition, toast } from 'react-toastify';
import styled from 'styled-components';

export const notifyImgSizeLimitErr = () =>
  toast(ImgSizeLimitMsg, {
    className: 'img-limit-err',
    transition: fade,
  });

const ImgSizeLimitMsg = () => {
  return (
    <ErrorMsgNetS>
      <img src={error_Icon} alt='error_Icon' />
      <div>
        이미지 용량을 초과하였습니다.
        <br />
        10MB 이하의 파일을 올려주세요.
      </div>
    </ErrorMsgNetS>
  );
};

const ErrorMsgNetS = styled.div`
  display: flex;
  align-items: center;
  gap: 0.37rem;

  img {
    width: 3rem;
    height: 1.59675rem;
  }
`;

const fade = cssTransition({
  enter: 'fade-in',
  exit: 'fade-out',
  collapseDuration: 200,
});
