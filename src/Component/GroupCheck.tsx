import { useNavigate, useParams } from 'react-router-dom';
import { getCheckedJoined } from '../API/joinedMinds';
import { getMindSingle } from '../API/Mind';
import getToken from '../data/tocken';
const GroupCheck = ({
  component,
  sort,
}: {
  component: JSX.Element;
  sort: 'Page' | 'Upload' | 'Intro';
}): JSX.Element => {
  const navigate = useNavigate();
  const { mindId } = useParams();

  const ResultComp = (): JSX.Element => {
    (async () => {
      if (sort === 'Intro') {
        const { access_token } = getToken();

        if (access_token !== null) {
          await getCheckedJoined(Number(mindId)).then(
            (isJoined: boolean) => isJoined && navigate('/'),
          );
        }
        return component;
      }

      await getCheckedJoined(Number(mindId)).then((isJoined: boolean) => {
        if (sort === 'Page' && !isJoined) navigate('/');
        if (sort === 'Upload') {
          getMindSingle(Number(mindId))
            .then((isDoneToday: boolean) => isDoneToday && navigate('/'))
            .catch(() => {});
        }
      });
    })();

    return component;
  };

  return <ResultComp />;
};

export default GroupCheck;
