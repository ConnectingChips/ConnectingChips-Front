import { styled } from "styled-components";
import { MissionSingleWide } from "./MissionTab";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import groupListData from "../../data/groupListData";

/** 2023-08-22 HeadLine.tsx - 타이틀 / 태그 / n일차 */
const HeadLine = (): JSX.Element => {
  const { uuid } = useParams();

  const [urlPath, setUrlPath] = useState("");
  const location = useLocation();

  useEffect(() => {
    const url = location.pathname;
    const keyword = "groupIntro";
    const extractedValue = url.split("/").find((part) => part === keyword);
    if (extractedValue === undefined) return;

    setUrlPath(extractedValue);
  }, [location]);

  const groupInfo = groupListData.find((groupData) => groupData.group_id === Number(uuid));
  if (groupInfo === undefined) return <></>;

  return (
    <HeadLineS>
      <MissionSingleWide text={groupInfo.tab} />
      <h1>{groupInfo.title}</h1>
      <p className={urlPath === "groupIntro" ? "" : "subTitle"}>{groupInfo.memberList.length > 0 ? `${groupInfo.memberList.length - 1}명과 함께 맛보기 중` : "첫번째로 작심 맛보기!"}</p>
    </HeadLineS>
  );
};

export default HeadLine;

/** 2023-08-22 HeadLine.tsx - 그룹 인트로 아티클 */
const HeadLineS = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  h1 {
    font-size: 1.5rem;
    font-weight: 500;
  }

  p {
    font-size: 0.75rem;

    &.subTitle {
      color: var(--font-color2);
    }
  }
`;
