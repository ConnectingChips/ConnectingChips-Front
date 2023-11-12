import { useState } from 'react';
import styled from 'styled-components';
import InfoMessage from './InfoMessage';
import { ReactComponent as InfoIcon } from '../../image/Icon/Info_icon.svg';

const UploadImageTitle = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleInfoIconClick = () => {
    setIsOpen(!isOpen);
  };

  return (
    <UploadImageTitleS>
      <h2>
        인증샷 올리기<span className='required'>&#40;필수&#41;</span>
      </h2>
      <InfoIcon onClick={handleInfoIconClick} />
      {isOpen && <InfoMessage className='info_message_position' setIsOpen={setIsOpen} />}
    </UploadImageTitleS>
  );
};

export default UploadImageTitle;

const UploadImageTitleS = styled.div`
  display: flex;
  align-items: center;
  gap: 0.38rem;
  position: relative;

  .required {
    color: var(--system-green);
  }

  svg {
    position: relative;
    top: 1px;
  }

  .info_message_position {
    position: absolute;
    top: 2.13rem;
    left: 0;
    z-index: 1;
  }
`;
