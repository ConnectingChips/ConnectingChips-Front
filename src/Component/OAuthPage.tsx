import { Navigate } from 'react-router-dom';

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
  const isLogined = localStorage.getItem('access_tocken');

  const loginComp = (loginCeck: boolean, component: JSX.Element) => {
    return loginCeck ? component : <Navigate to='/' />;
  };

  return authenticated === 'access'
    ? loginComp(!!isLogined, component)
    : loginComp(!isLogined, component);
};

export default OAuthPage;
