import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

import { Mylist } from '../HomeBarrel';
import { getCheckedJoined, postJoin } from '../../../API/joinedMinds';

const ButtonList = ({ myList }: { myList: Mylist[] }): JSX.Element => {
  return (
    <ul>
      {myList.map((mind, idx) => (
        <CarreselBtnList mind={mind} key={idx} />
      ))}
    </ul>
  );
};
export default ButtonList;

/** 2023-08-22 ButtonList.tsx - 캐러셀 버튼 영역 - Kadesti */
const CarreselBtnList = ({ mind }: { mind: Mylist }) => {
  const navigate = useNavigate();

  const { count, isDoneToday, mindId, boardCount } = mind;
  const keppJoinReg = boardCount !== 0 && boardCount % 3 === 0 && count === 0;

  return (
    <>
      {keppJoinReg ? (
        <ClearBtnS onClick={() => navigate(`/uploadPost/${mind.mindId}`)}>재작심 하기</ClearBtnS>
      ) : isDoneToday ? (
        <TodayClearBtnS>
          <p>오늘 작심 성공!</p>
        </TodayClearBtnS>
      ) : (
        <NoneClearBtnS
          onClick={() => {
            goPost(mindId)
              .then(() => navigate(`/uploadPost/${mindId}`))
              .catch(() => navigate('/error'));
          }}
        >
          작심 인증하기
        </NoneClearBtnS>
      )}
    </>
  );
};

const goPost = async (mindId: number): Promise<boolean> => await getCheckedJoined(mindId);

const CommonBtnS = styled.button`
  width: var(--width-my-mission);
  border-radius: 2rem;
  box-sizing: border-box;
  height: 2.5rem;
  font-size: var(--button-mid);

  text-align: center;
`;

const TodayClearBtnS = styled(CommonBtnS)`
  color: var(--color-main);
  background-color: black;
  p {
    margin-top: -2px;
    font-size: var(--button-mid);
  }
`;

const ClearBtnS = styled(CommonBtnS)`
  background-color: var(--color-main);
  color: black;
`;

const NoneClearBtnS = styled(CommonBtnS)`
  border: 0.1rem solid var(--color-main);
  color: black;
`;
