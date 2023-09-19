import { styled } from './GroupPageBarrel';
import { useFindGroup, GroupHeader, DivideBaS, GroupArticle } from './GroupPageBarrel';
import { GroupPostList } from './GroupPostList';

/** 2023-08-22 GroupPage.tsx - 메인 컴프 */
const GroupPage = (): JSX.Element => {
  const { url } = useFindGroup('Page');

  return (
    <GroupPageS>
      <GroupHeader />
      <GroupImageS url={url} />

      {/* <GroupArticle selected={[0, 1, 3]} passsort='Page' /> */}
      <DivideBaS />

      <GroupPostList />
    </GroupPageS>
  );
};

export default GroupPage;

const GroupPageS = styled.div`
  width: var(--width-mobile);
  margin-bottom: 5rem;
  position: relative;
`;

/** 2023-08-22 GroupPage.tsx - 그룹페이지 대표 이미지 */
const GroupImageS = styled.div<{ url: string }>`
  background-image: url(${(props) => props.url});
  background-size: 25rem;
  // FIXME: 고쳐야할수도
  background-position: 0 -1rem;
  height: 10rem;
`;
