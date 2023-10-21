import axios from 'axios';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { postJoin } from '../../API/joinedMinds';
import { getMyList } from '../../API/Mind';
import { EXPIRED_TOKEN, INVALID_TOKEN } from '../../constant/error';

const CTAContainer = (): JSX.Element => {
  return (
    <CTAContainerS>
      {/* <GNB /> */}
      <JoinButtonCTA />
    </CTAContainerS>
  );
};

const JoinButtonCTA = (): JSX.Element => {
  const navigate = useNavigate();
  const { mindId } = useParams();
  const [validJoin, setValidJoin] = useState('true');
  const location = useLocation();

  useEffect(() => {
    getMyList().then((data) => {
      data.length === 3 && setValidJoin('false');
    });
  }, []);

  const joinGroup = async () => {
    try {
      await postJoin(Number(mindId));
      sessionStorage.setItem(`intro_${mindId}`, location.pathname);
      navigate(`/groupPage/${Number(mindId)}`);
    } catch (error) {
      console.error('참여하기 실패: ', error);

      if (axios.isAxiosError(error)) {
        console.log(error.response?.data.code);

        if (error.response?.data.code === EXPIRED_TOKEN) {
          localStorage.removeItem('access_token');
          return navigate('/LogIn');
        }

        if (error.response?.data.code === INVALID_TOKEN) {
          localStorage.removeItem('access_token');
          return navigate('/LogIn');
        }
      }
    }
  };

  return validJoin === 'true' ? (
    <CTAButtonS valid={validJoin} onClick={joinGroup}>
      참여하기
    </CTAButtonS>
  ) : (
    <CTAButtonS valid={validJoin}>최대 3개의 그룹까지 참여 가능합니다</CTAButtonS>
  );
};

/** 2023-08-28 CTAContainer.tsx - 작심 인증하기 버튼 */
const BackButton = (): JSX.Element => {
  const navigate = useNavigate();
  return <BackButtonS onClick={() => navigate(-1)}>이전 페이지로</BackButtonS>;
};

/** 2023-08-22 CTAContainer.tsx - 인증하기 버튼 */
const SubmitButtonCTA = ({ hasImage }: { hasImage: boolean }): JSX.Element => {
  return (
    <SubmitButtonWrapperS>
      <CTAButtonS valid={String(hasImage)} disabled={!hasImage}>
        인증하기
      </CTAButtonS>
    </SubmitButtonWrapperS>
  );
};

/** 2023-08-22 CTAContainer.tsx - CTA 참여하기 + GNB */
const ErrorCTA = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <ErrorButtonWrapperS>
      <CTAButtonS valid={'true'} onClick={() => navigate('/')}>
        메인으로
      </CTAButtonS>
    </ErrorButtonWrapperS>
  );
};

export { JoinButtonCTA, SubmitButtonCTA, CTAContainer, BackButton, ErrorCTA };

/** 2023-08-22 CTAContainer.tsx - CTA 참여하기 + GNB */
const CTAContainerS = styled.div`
  position: sticky;
  display: flex;
  flex-direction: column-reverse;
`;

const SubmitButtonWrapperS = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  bottom: 0;
  background-color: #fff;

  button {
    width: 100%;
  }
`;

const ErrorButtonWrapperS = styled.div`
  position: absolute;
  bottom: 0rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: var(--width-max);
`;

/** 2023-08-22 CTAContainer.tsx - 버튼 공통 스타일 */
const LinkButtonS = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 3.5rem;
  border-radius: 1.88rem;
  margin-top: 1.25rem;
`;

/** 2023-08-22 CTAContainer.tsx - CTA 버튼(참여하기, 인증하기) */
const CTAButtonS = styled(LinkButtonS)<{ valid: string }>`
  position: sticky;
  margin: 1rem;
  background-color: ${(props) =>
    props.valid === 'true' ? 'var(--color-main)' : 'var(--color-disabled2)'};
  font-size: 1rem;
  color: ${(props) => (props.valid === 'true' ? 'var(--font-color1)' : 'var(--color-disabled1)')};
`;

/** 2023-08-22 CTAContainer.tsx - 작심 인증하기 버튼 */
const MissionButtonS = styled(LinkButtonS)`
  width: 100%;
  border: 0.1rem solid;
  border-color: var(--color-main);
  font-size: var(--button-mid);
`;

/** 2023-08-28 CTAContainer.tsx - 이전 페이지로 버튼 */
const BackButtonS = styled(MissionButtonS)`
  height: 2.5rem;
  width: 11.25rem;
`;
