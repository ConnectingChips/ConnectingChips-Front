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

  console.log('sort: ', sort);

  const ResultComp = (): JSX.Element => {
    (async () =>
      await getCheckedJoined(Number(mindId)).then((isJoined: boolean) => {
        if (!isJoined) navigate('/');
        if (sort === 'Upload') {
          getMindSingle(Number(mindId))
            .then((isDoneToday: boolean) => isDoneToday && navigate('/error'))
            .catch(() => {});
        }
      }))();

    return component;
  };

  return <ResultComp />;
};

export default GroupCheck;
