import { useNavigate, useParams } from 'react-router-dom';
import { getCheckedJoined } from '../API/joinedMinds';

const GroupCheck = ({ component }: { component: JSX.Element }): JSX.Element => {
  const navigate = useNavigate();
  const mind_id = useParams();

  const ResultComp = (): JSX.Element => {
    (async () =>
      await getCheckedJoined(Number(mind_id)).then((res) => {
        if (!res) navigate('/');
      }))();

    return component;
  };

  return <ResultComp />;
};

export default GroupCheck;
