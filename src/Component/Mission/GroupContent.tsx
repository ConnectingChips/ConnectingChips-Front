import { styled } from 'styled-components';
import GroupArticle from './GroupArticle';
import { CreateExample } from '../../Page/GroupIntro/ActiveExample';
import { PageSort } from '../../Type/MissionType';
import DivideBaS from './DivideBa';

type GroupContentProps = {
  selected: number[];
  passsort: PageSort;
};

/** 2023-08-22 GroupContent.tsx - 아티클 + 내용 [ 0 : 헤드라인 1 : 소개 2 : 규칙 3 : 버튼 ] */
const GroupContent = ({ selected, passsort }: GroupContentProps) => {
  return (
    <>
      <GroupArticle selected={selected} passsort={passsort} />
      {passsort === 'Intro' ? null : passsort === 'Create' ? (
        <>
          <CreateExample passsort={passsort} />
          <DivideBaS />
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default GroupContent;
