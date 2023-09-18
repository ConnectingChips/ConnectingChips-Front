import { useState, styled } from './GroupPageBarrel';
import {
  useFindGroup,
  GroupHeader,
  // type LikeBind,
  // Comment,
  DivideBaS,
  // GroupActive,
  // Mind,
  GroupArticle,
} from './GroupPageBarrel';
import { GroupPostList } from './GroupPostList';

// TODO: GroupPost 하나도 없다면 noMind이미지 뜨게하기
// TODO: GroupPost 2개씩 넣으면 이미지 두개들어가는거 고치기
/** 2023-08-22 GroupPage.tsx - 메인 컴프 */
const GroupPage = (): JSX.Element => {
  const { intro, rule, url } = useFindGroup('page');

  return (
    <GroupPageS>
      <GroupHeader />
      {/* FIXME: url 안먹힘 */}
      <GroupImageS url={url} />
      <GroupSummary intro={intro} rule={rule} selected={[0, 1, 3]} />
      <GroupPostList />
    </GroupPageS>
  );
};

export default GroupPage;

type GroupPostProps = {
  intro: string;
  rule: string;
  selected: number[] | null;
};

/** 2023-08-26 GroupPage.tsx - 그룹페이지 소개글 - 0 : 헤드라인 1 : 소개 2 : 규칙 3 : 버튼 */
const GroupSummary = ({ intro, rule, selected }: GroupPostProps) => {
  return (
    <>
      <GroupArticle groupText={intro} groupRule={rule} selected={selected} passsort='Page' />
      <DivideBaS />
    </>
  );
};

const GroupPageS = styled.div`
  width: var(--width-mobile);
  position: relative;
`;

/** 2023-08-22 GroupPage.tsx - 그룹페이지 대표 이미지 */
const GroupImageS = styled.div<{ url: string }>`
  background-image: url(${(props) => props.url});
  background-size: 25rem;
  background-position: 0 -1rem;
  height: 10rem;
`;
