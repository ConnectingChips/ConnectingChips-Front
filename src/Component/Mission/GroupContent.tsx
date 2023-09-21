import { styled } from 'styled-components';
import GroupArticle from './GroupArticle';
import { IntroExample, CreateExample } from '../../Page/GroupIntro/ActiveExample';
import { PageSort } from '../../Type/MissionType';
import DivideBaS from './DivideBa';

type GroupContentProps = {
  selected: number[];
  passsort: PageSort;
};

/** 2023-08-22 GroupContent.tsx - 아티클 + 내용 [ 0 : 헤드라인 1 : 소개 2 : 규칙 3 : 버튼 ] */
const GroupContent = ({ selected, passsort }: GroupContentProps) => {
  return (
    <GroupContentS passsort={passsort}>
      <GroupArticle selected={selected} passsort={passsort} />
      {/* FIXME: Intro일경우 예시사진이 없어야하는데 혹시몰라서 코드 남겨놓음 */}
      {passsort === 'Intro' ? null : passsort === 'Create' ? ( // <IntroExample passsort={passsort} />
        <>
          <CreateExample passsort={passsort} />
          <DivideBaS />
        </>
      ) : (
        <></>
      )}
    </GroupContentS>
  );
};

export default GroupContent;

/** 2023-08-22 GroupPage.tsx - 그룹페이지 아티클 + 인증 글 */
const GroupContentS = styled.div<{ passsort: PageSort }>`
  margin-bottom: var(--height-gap);

  &::before {
    height: ${(props) => (props.passsort === 'Intro' ? '30rem' : '0')};
    content: '';
    display: block;
  }
`;
