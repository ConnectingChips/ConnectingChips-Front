import { CarreselProps } from "../../../Type/MissionType";
import { MissionSingleWide, myGroupImages, myInfo, myGroupList, ChipList, styled } from "./CarreselBarrel";
import useCarresel from "./useCarresel";
import ImageBoxS from "../../../StyleComp/ImageBoxS";
import CarreselSlideButton from "./CarreselSlideButton";

/** 2023-08-29 Carresel.tsx - 캐러셀 컨텐츠 리스트 */
const Carresel = ({ carreselProps }: { carreselProps: CarreselProps }) => {
  const { slideRef, count, setCount, sort, setSort, TOTAL_SLIDES, doneBind, countBind, uuidBind } = carreselProps;
  const { dateList, doneList, countList, uuidList } = useCarresel(doneBind, countBind, uuidBind);

  /** 2023-09-22 Carresel.tsx - 내 작심 현황 - Kadesti */
  const Mylist = myGroupList.map((mygroup, index) => {
    const missionInfo = mygroup.memberList.find((member) => member.member_id === myInfo.my_id);
    if (missionInfo === undefined) return <></>;

    const { tab, title } = mygroup;

    return (
      // <li key={uuidList[index]}>
      <li key={index}>
        <MyMissionInfoS href={`/groupPage/${uuidList[index]}`}>
          <img src={myGroupImages[index]} alt="main_image" />
          <MissionContentS>
            <MissionSingleWide text={tab} />
            <h2>{title}</h2>
            <p>
              🔥 <span className="date">{dateList[index]}</span>일자 맛보기 중
            </p>
          </MissionContentS>
          <ChipList count={countList[index]} />
        </MyMissionInfoS>
      </li>
    );
  });

  return (
    <div>
      <MissionListS>
        {/* 나의 작심 컨텐츠 */}
        <ImageBoxS ref={slideRef} count={count} sort={sort} length={TOTAL_SLIDES}>
          {Mylist}
        </ImageBoxS>
        <CarreselSlideButton count={count} setSort={setSort} setCount={setCount} TOTAL_SLIDES={TOTAL_SLIDES} />
      </MissionListS>
    </div>
  );
};

export default Carresel;

/** 2023-09-02 Carresel.tsx - 캐러샐 영역 - Kadesti */
const MissionListS = styled.div`
  display: flex;
  position: relative;
`;

/** 2023-08-21 MyMisson.tsx - 나의 작심 현황 항목 정보 */
const MyMissionInfoS = styled.a`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  border: 0.1px solid;
  border-radius: 0.625rem;
  margin-bottom: 1rem;

  color: white;
  position: relative;

  cursor: pointer;

  h2 {
    font-size: 1.3rem;
    margin-top: 0.2rem;
    height: 4rem;
  }

  div,
  p,
  li,
  h2 {
    cursor: pointer;
  }

  span.date {
    color: var(--color-main);
  }
`;

/** 2023-08-29 MyMisson.tsx - 나의 작심 현황 텍스트 */
const MissionContentS = styled.div`
  position: absolute;
  padding: 1rem;
`;
