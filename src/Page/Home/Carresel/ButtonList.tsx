import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import ImageBoxS from '../../../StyleComp/ImageBoxS';

import { MyListContext, useContext } from '../HomeBarrel';
import useMission from '../../../Hooks/useCarresel';
import { LoggableObject, getCkeckedJoined, putReJoin } from '../../../API/joinedMinds';

/** 2023-09-02 ButtonList.tsx - 캐러셀 버튼 영역 - Kadesti */
const ButtonList = (): JSX.Element => {
  const { buttonDataProps } = useMission();
  const { slideRef, count, sort } = buttonDataProps;
  const { myList } = useContext(MyListContext);

  return (
    <ImageBoxS ref={slideRef} count={count} sort={sort} length={myList.length}>
      {myList.map((mind) => {
        const { count, isDoneToday, id } = mind;
        return (
          <CarreselBtnList myCount={count} completedToday={isDoneToday} mind_id={id} key={id} />
        );
      })}
    </ImageBoxS>
  );
};

export default ButtonList;

/** 2023-08-22 ButtonList.tsx - 캐러셀 버튼 영역 - Kadesti */
const CarreselBtnList = ({
  myCount,
  completedToday,
  mind_id,
}: {
  myCount: number;
  completedToday: boolean;
  mind_id: number;
}) => {
  const navigate = useNavigate();

  const remind = async () => putReJoin(mind_id);

  return (
    <>
      {myCount === 3 ? (
        <ClearBtnS onClick={remind}>재작심 하기</ClearBtnS>
      ) : completedToday ? (
        <TodayClearBtnS>
          <p>오늘 작심 성공!</p>
        </TodayClearBtnS>
      ) : (
        <NoneClearBtnS
          onClick={() => {
            goPost(mind_id)
              .then(() => navigate(`/uploadPost/${mind_id}`))
              .catch(() => navigate('/error'));
          }}
        >
          작심 인증하기
        </NoneClearBtnS>
      )}
    </>
  );
};

const goPost = async (mind_id: number): Promise<LoggableObject> => await getCkeckedJoined(mind_id);

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
  }
`;

const ClearBtnS = styled(CommonBtnS)`
  background-color: var(--color-main);
  color: black;
`;

const NoneClearBtnS = styled(CommonBtnS)`
  border: 0.1rem solid var(--color-main);
`;
