import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { getCheckedJoined } from '../API/joinedMinds';
import { getMindSingle } from '../API/Mind';
import { EXPIRED_TOKEN, INVALID_TOKEN } from '../constant/error';
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
    (async () =>
      await getCheckedJoined(Number(mindId))
        .then((isJoined: boolean) => {
          if (sort === 'Page' && !isJoined) navigate('/');
          if (sort === 'Intro' && isJoined) navigate('/');
          if (sort === 'Upload') {
            getMindSingle(Number(mindId))
              .then((isDoneToday: boolean) => isDoneToday && navigate('/'))
              .catch(() => {});
          }
        })
        .catch((error) => {
          // TODO: 코드 중복 수정 필요 / 공통으로 처리할 에러 정리 필요
          if (axios.isAxiosError(error)) {
            console.log(error);

            if (error.response?.data.code === EXPIRED_TOKEN) {
              localStorage.removeItem('access_token');
              return navigate('/');
            }

            if (error.response?.data.code === INVALID_TOKEN) {
              localStorage.removeItem('access_token');
              return navigate('/');
            }
          }
        }))();

    return component;
  };

  return <ResultComp />;
};

export default GroupCheck;
