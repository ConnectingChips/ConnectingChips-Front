import styled from 'styled-components';
import { ReactComponent as CloseIcon } from '../../image/Icon/close_icon_light_gray.svg';

interface InfoMessageProps {
  className: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const InfoMessage = ({ className, setIsOpen }: InfoMessageProps) => {
  const handleCloseIconClick = () => {
    setIsOpen(false);
  };

  return (
    <ContainerS className={className}>
      <InfoContentS>이미지 비율은 최대 9:16까지 지원합니다.</InfoContentS>
      <CloseIcon onClick={handleCloseIconClick} />
    </ContainerS>
  );
};

export default InfoMessage;

const ContainerS = styled.div`
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1rem 0.94rem 1rem 1.06rem;
  border: 1px solid var(--color-main);
  border-radius: 0.3125rem;
  font-size: var(--body-b);
  background: var(--color-white);
`;

const InfoContentS = styled.span`
  color: var(--font-color2);
`;
