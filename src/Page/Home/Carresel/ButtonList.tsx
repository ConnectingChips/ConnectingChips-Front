import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { ButtonListProps } from "../../../Type/MissionType";
import ImageBoxS from "../../../StyleComp/ImageBoxS";

/** 2023-09-02 ButtonList.tsx - 캐러셀 버튼 영역 - Kadesti */
const ButtonList = ({ buttonListProps }: { buttonListProps: ButtonListProps }): JSX.Element => {
  const { slideRef, count, sort, TOTAL_SLIDES, IMG, doneList, uuidList, countList } = buttonListProps;
  return (
    <ImageBoxS ref={slideRef} count={count} sort={sort} length={TOTAL_SLIDES}>
      {IMG.map((_, index) => {
        return <CarreselBtnList myCount={countList[index]} completedToday={doneList[index]} uuid={uuidList[index]} key={index} />;
      })}
    </ImageBoxS>
  );
};

export default ButtonList;

/** 2023-08-22 ButtonList.tsx - 캐러셀 버튼 영역 - Kadesti */
const CarreselBtnList = ({ myCount, completedToday, uuid }: { myCount: number; completedToday: boolean; uuid: number }) => {
  return (
    <>
      {myCount === 3 ? (
        <Link to={`/groupPage/${uuid}`}>
          <ClearBtnS>재작심하기</ClearBtnS>
        </Link>
      ) : completedToday ? (
        <TodayClearBtnS>오늘 작심 성공!</TodayClearBtnS>
      ) : (
        <Link to="/uploadPost/1">
          <NoneClearBtnS>작심 인증하기</NoneClearBtnS>
        </Link>
      )}
    </>
  );
};

/** 2023-08-21 ButtonList.tsx - 다른 작심 둘러보기 버튼 */
const ClearBtnS = styled.button`
  padding: 1rem;
  width: var(--width-my-mission);
  border-radius: 2rem;
  background-color: black;
  color: var(--color-main);
`;

/** 2023-08-27 ButtonList.tsx - 오늘 작심 성공! 버튼 */
const TodayClearBtnS = styled.button`
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
  border: 0.1rem solid yellow;
  padding: 1rem;
  width: var(--width-my-mission);
  border-radius: 2rem;
`;
