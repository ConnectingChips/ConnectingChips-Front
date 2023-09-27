import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { MyListContext, MyListContextType } from '../../API/Context';
import { postJoin } from '../../API/joinedMinds';
import { getMyList } from '../../API/Mind';
import { EXPIRED_TOKEN, INVALID_TOKEN } from '../../constant/error';
// TODO: api: 참여하기 요청보내기 /joined-minds/{joined_mind_id}
/** 2023-08-22 CTAContainer.tsx - 참여하기 버튼 */
const JoinButtonCTA = (): JSX.Element => {
  const navigate = useNavigate();
  const { mindId } = useParams();
  const [isLogin, setIsLogin] = useState(false);
  const [validJoin, setValidJoin] = useState('true');
  const { myList, setMylist } = useContext<MyListContextType>(MyListContext);
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

/** 2023-08-22 CTAContainer.tsx - 작심 인증하기 버튼 */
const PostButton = (): JSX.Element => {
  const navigate = useNavigate();
  return <MissionButtonS onClick={() => navigate(`/uploadPost/1`)}>작심 인증하기</MissionButtonS>;
};

/** 2023-08-28 CTAContainer.tsx - 작심 인증하기 버튼 */
const BackButton = (): JSX.Element => {
  const navigate = useNavigate();
  return <BackButtonS onClick={() => navigate(-1)}>이전 페이지로</BackButtonS>;
};

/** 2023-08-22 CTAContainer.tsx - 인증하기 버튼 */
const SubmitButtonCTA = (): JSX.Element => {
  return <CTAButtonS valid={'true'}>인증하기</CTAButtonS>;
};

/** 2023-08-22 CTAContainer.tsx - CTA 참여하기 + GNB */
const CTAContainer = (): JSX.Element => {
  return (
    <CTAContainerS>
      {/* <GNB /> */}
      <JoinButtonCTA />
    </CTAContainerS>
  );
};

/** 2023-08-22 CTAContainer.tsx - CTA 참여하기 + GNB */
const ErrorCTA = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <ErrorCTAS>
      <CTAButtonS valid={'true'} onClick={() => navigate('/')}>
        메인으로
      </CTAButtonS>
    </ErrorCTAS>
  );
};

export { JoinButtonCTA, PostButton, SubmitButtonCTA, CTAContainer, BackButton, ErrorCTA };

/** 2023-08-22 CTAContainer.tsx - CTA 참여하기 + GNB */
const CTAContainerS = styled.div`
  position: sticky;
  bottom: 0;
  display: flex;
  flex-direction: column-reverse;
  gap: 1rem;
`;

/** 2023-08-22 CTAContainer.tsx - 버튼 공통 스타일 */
const LinkButtonS = styled.button`
  height: 3.5rem;
  border-radius: 1.88rem;
  margin-top: 1.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ErrorCTAS = styled.div`
  position: fixed;
  bottom: 1rem;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

/** 2023-08-22 CTAContainer.tsx - CTA 버튼(참여하기, 인증하기) */
const CTAButtonS = styled(LinkButtonS)<{ valid: string }>`
  background-color: ${(props) =>
    props.valid === 'true' ? 'var(--color-main)' : 'var(--color-disabled2)'};
  margin: 1rem;
  margin-bottom: 1rem;
  position: sticky;
  bottom: 0rem;
  font-size: var(--button-mid);
  color: ${(props) => (props.valid === 'true' ? 'var(--font-color1)' : 'var(--color-disabled1)')};
  font-size: 1rem;
`;

/** 2023-08-22 CTAContainer.tsx - 작심 인증하기 버튼 */
const MissionButtonS = styled(LinkButtonS)`
  border: 0.1rem solid;
  border-color: var(--color-main);
  font-size: var(--button-mid);
  width: 100%;
`;

/** 2023-08-28 CTAContainer.tsx - 이전 페이지로 버튼 */
const BackButtonS = styled(MissionButtonS)`
  height: 2.5rem;
  width: 11.25rem;
  font-size: var(--button-mid);
`;
