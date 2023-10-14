import styled from 'styled-components';
import { BackIcon, GroupHeaderContainerS } from '../../Component/Mission/GroupHeader';

const UploadPostHeader = () => {
  return (
    <UploadPostHeaderS>
      <BackIcon />
      <h1>작심 글쓰기</h1>
    </UploadPostHeaderS>
  );
};

export default UploadPostHeader;

const UploadPostHeaderS = styled(GroupHeaderContainerS)`
  justify-content: center;
  left: 0;

  h1 {
    font-size: var(--header);
    font-weight: 500;
  }

  img {
    position: absolute;
    left: 1rem;
  }
`;
