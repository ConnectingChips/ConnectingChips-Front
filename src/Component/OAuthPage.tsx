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

  // FIXME: 로컬스토리지 내 토큰 로컬적인 확인
  const isLogined = localStorage.getItem('access_token');
  const loginComp = (loginCeck: boolean, component: JSX.Element) => {
    return loginCeck ? component : <Navigate to='/' />;
  };

  return authenticated === 'access'
    ? loginComp(!!isLogined, component)
    : loginComp(!isLogined, component);

  // TODO: getUser를 사용한 유저 정보 조회
  // const ResultComp = () => {
  //   const successHome = async () => await getUser().then(() => navigate('/'));
  //   const failedHome = async () => await getUser().catch(() => navigate('/'));

  //   if (authenticated === 'access') failedHome();
  //   else successHome();

  //   return component;
  // };

  // return <ResultComp />;
};

export default OAuthPage;
