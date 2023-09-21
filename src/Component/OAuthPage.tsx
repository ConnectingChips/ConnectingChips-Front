import { useNavigate } from 'react-router-dom';
import { getIsLogined } from '../API/Users';

type OAuthPageProps = {
  component: JSX.Element;
  authenticated: 'access' | 'block';
};

const OAuthPage = ({ component, authenticated }: OAuthPageProps): JSX.Element => {
  const navigate = useNavigate();

  const ResultComp = () => {
    const testHome = async (): Promise<false | void> =>
      await getIsLogined()
        .then((isLogin: boolean) => {
          if (!isLogin) {
            localStorage.removeItem('access_token');
            // TODO: 토스트 메시지
          }
        })
        .catch(() => navigate('/'));

    testHome();

    return component;
  };

  return <ResultComp />;
};

export default OAuthPage;
