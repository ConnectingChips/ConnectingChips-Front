import { Link } from 'react-router-dom';
import { styled } from 'styled-components';

// TODO: 갈아끼울 코드
// import { CommonProps } from '../../../Type/MissionType';

// FIXME: 사라져야할 코드
import { ButtonListProps } from '../../../Type/MissionType';
import ImageBoxS from '../../../StyleComp/ImageBoxS';

import { fetchMyList, initMyList, useEffect, useState } from '../HomeBarrel';

/** 2023-09-02 ButtonList.tsx - 캐러셀 버튼 영역 - Kadesti */
//TODO: 갈아끼울 코드
// const ButtonList = ({ buttonListProps }: { buttonListProps: CommonProps }): JSX.Element => {
//   const { slideRef, count, sort, TOTAL_SLIDES } = buttonListProps;
//   const [myList, setMyList] = useState(initMyList.data);

//   useEffect(() => {
//     fetchMyList(setMyList);
//   }, []);

//   return (
//     <ImageBoxS ref={slideRef} count={count} sort={sort} length={TOTAL_SLIDES}>
//       {myList.map((mind) => {
//         const { count, isDoneToday, id } = mind;
//         return <CarreselBtnList myCount={count} completedToday={isDoneToday} uuid={id} key={id} />;
//       })}
//     </ImageBoxS>
//   );
// };

// FIXME: 사라질 코드
const ButtonList = ({ buttonListProps }: { buttonListProps: ButtonListProps }): JSX.Element => {
  const { slideRef, count, sort, TOTAL_SLIDES, IMG, doneList, uuidList, countList } =
    buttonListProps;
  return (
    <ImageBoxS ref={slideRef} count={count} sort={sort} length={TOTAL_SLIDES}>
      {IMG.map((_, index) => {
        return (
          <CarreselBtnList
            myCount={countList[index]}
            completedToday={doneList[index]}
            key={index}
          />
        );
      })}
    </ImageBoxS>
  );
};
export default ButtonList;

/** 2023-08-22 ButtonList.tsx - 캐러셀 버튼 영역 - Kadesti */
const CarreselBtnList = ({
  myCount,
  completedToday
}: {
  myCount: number;
  completedToday: boolean;
}) => {
  const remind = async () => {
    await fetch('/joined-minds/{mind_id}/remind', { method: 'PUT' });
  };

  return (
    <>
      {myCount === 3 ? (
        <ClearBtnS onClick={remind}>재작심하기</ClearBtnS>
      ) : completedToday ? (
        <TodayClearBtnS>오늘 작심 성공!</TodayClearBtnS>
      ) : (
        <Link to='/uploadPost/1'>
          <NoneClearBtnS>작심 인증하기</NoneClearBtnS>
        </Link>
      )}
    </>
  );
};

/** 2023-08-21 ButtonList.tsx - 다른 작심 둘러보기 버튼 */
const TodayClearBtnS = styled.button`
  padding: 1rem;
  width: var(--width-my-mission);
  border-radius: 2rem;
  background-color: black;
  color: var(--color-main);
`;

/** 2023-08-27 ButtonList.tsx - 오늘 작심 성공! 버튼 */
const ClearBtnS = styled.button`
  padding: 1rem;
  width: var(--width-my-mission);
  border-radius: 2rem;
  background-color: var(--color-main);
  color: black;
  &:hover {
    cursor: default;
  }
`;

/** 2023-08-21 ButtonList.tsx - 작심 인증하기 버튼 */
const NoneClearBtnS = styled.button`
  border: 0.1rem solid var(--color-main);
  padding: 1rem;
  width: var(--width-my-mission);
  border-radius: 2rem;
`;
