import { Navigate, useNavigate } from 'react-router-dom';
import { getUser } from '../API/userService';

type OAuthPageProps = {
  component: JSX.Element;
  authenticated: 'access' | 'block';
};

/**
 * 비로그인/로그인 접근 권한 체크
 * @param component 보여질 컴포넌트
 * @param authenticated 'access' | 'block' :: 로그인상태에서 접근가능 여부
 * @returns JSX.Element
 */
const OAuthPage = ({ component, authenticated }: OAuthPageProps): JSX.Element => {
  const navigate = useNavigate();
  
  const ResultComp = () => {
    const successHome = async () => await getUser().then(() => navigate('/'));
    const failedHome = async () => await getUser().catch(() => navigate('/'));

    if (authenticated === 'access') failedHome();
    else successHome();

    return component;
  };

  return <ResultComp />;
};

export default OAuthPage;
