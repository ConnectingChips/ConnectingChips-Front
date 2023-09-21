import { useNavigate, useParams } from 'react-router-dom';
import { getCheckedJoined } from '../API/joinedMinds';
import { getMindSingle } from '../API/Mind';

const GroupCheck = ({
  component,
  sort,
}: {
  component: JSX.Element;
  sort: 'Mind' | 'Upload';
}): JSX.Element => {
  const navigate = useNavigate();
  const { mindId } = useParams();

  const ResultComp = (): JSX.Element => {
    (async () =>
      await getCheckedJoined(Number(mindId)).then((res) => {
        if (sort === 'Upload')
          getMindSingle(Number(mindId))
            .then((isDone: boolean) => !isDone && navigate('/error'))
            .catch(() => {});

        if (!res) navigate('/');
      }))();

    return component;
  };

  return <ResultComp />;
};

export default GroupCheck;
