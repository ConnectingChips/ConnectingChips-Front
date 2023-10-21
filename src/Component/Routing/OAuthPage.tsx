import { useNavigate } from 'react-router-dom';
import { getIsLogined } from '../../API/Users';
import { NotFound } from '../../AppBarral';

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

    const access_token = localStorage.getItem('access_token');
    if (authenticated === 'access' && access_token !== null) return component;
    if (authenticated === 'block' && access_token === null) return component;
    return <GoHome />;
  };

  return <ResultComp />;
};

export default OAuthPage;

// 에러 페이지로 가버려 -> 홈으로 가자
const GoHome = (): JSX.Element => {
  const navigate = useNavigate();
  navigate('/');

  return <NotFound />;
};
