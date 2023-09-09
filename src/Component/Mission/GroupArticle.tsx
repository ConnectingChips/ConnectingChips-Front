import { styled } from "styled-components";
import HeadLine from "../../Component/Mission/HeadLine";
import MissionRule from "../../Component/Mission/MissionRule";
import MissionIntro from "./MissionIntro";
import { PostButton } from "../CTA/CTAContainer";
import { PageSort } from "../../Type/MissionType";

/** 2023-08-22 GroupArticle.tsx - 그룹 아티클 Props */
interface GroupArticleProps {
  groupText: string;
  groupRule: string;
  selected: number[] | null;
  passsort: PageSort;
}

/** 2023-08-22 GroupArticle.tsx - 그룹 아티클 - 0 : 헤드라인 1 : 소개 2 : 규칙 3 : 버튼 */
const GroupArticle = ({ groupText, groupRule, selected, passsort }: GroupArticleProps): JSX.Element => {
  const compArr = [<HeadLine />, <MissionIntro groupText={groupText} />, <MissionRule groupRule={groupRule} passsort={passsort} />, <PostButton />];
  if (selected === null) return <></>;

  return (
    <GroupArticleS passsort={passsort}>
      {selected.map((el) => (
        <div key={el}>{compArr[el]}</div>
      ))}
    </GroupArticleS>
  );
};

export default GroupArticle;

/** 2023-08-22 GroupArticle.tsx - 그룹 인트로 아티클 */
const GroupArticleS = styled.article<{ passsort: PageSort }>`
  margin: ${(props) => (props.passsort === "Intro" ? "0 1rem 0.5rem 1rem" : props.passsort === "Create" ? "1.25rem 1rem 0.5rem 1rem" : "0.87rem 1rem 1.25rem 1rem")};

  p {
    font-size: 0.875rem;
  }
`;
