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

/** 2023-08-22 GroupPage.tsx - 메인 컴프 */
const GroupPage = (): JSX.Element => {
  const { intro, rule, url } = useFindGroup('page');

  return (
    <GroupPageS>
      <GroupHeader />
      {/* FIXME: url 안먹힘 */}
      <GroupImageS url={url} />
      <GroupArticle groupText={intro} groupRule={rule} selected={[0, 1, 3]} passsort='Page' />
      <DivideBaS />
      <GroupPostList />
    </GroupPageS>
  );
};

export default GroupPage;

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
