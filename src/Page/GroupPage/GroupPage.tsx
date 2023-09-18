import { useState, styled } from './GroupPageBarrel';
import {
  useFindGroup,
  GroupHeader,
  type LikeBind,
  Comment,
  DivideBaS,
  GroupActive,
  // Mind,
  GroupArticle,
} from './GroupPageBarrel';

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

/** 2023-08-26 GroupPage.tsx - 그룹페이지 글 항목 */
const GroupPostList = () => {
  // TODO: post업애려면 Commendted false로 바꾸기
  const [Commented, setCommented] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
  const likeBind: LikeBind = { isLiked, setIsLiked };

  return (
    <GroupPostS>
      <h2>작심 인증글</h2>
      {Commented ? (
        <>
          <GroupActive passsort='Page' setCommented={setCommented} likeBind={likeBind} />
          <Comment Commented={Commented} />
        </>
      ) : (
        <GroupNoMindS>
          {/* TODO: 이미지 다른곳에 저장하기 */}
          <img src={`${process.env.PUBLIC_URL}/noMind.png`} alt='noMind'></img>
          <h2>등록된 인증글이 없습니다.</h2>
          <p>가장 먼저 작심을 인증해 보세요!</p>
        </GroupNoMindS>
      )}
    </GroupPostS>
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

const GroupPostS = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 1rem;
  gap: 0.75rem;
  // FIXME: commentinput의 하단자리가 부족해서 댓글을 가려버려서 임시로 넣음
  margin-bottom: 50px;
  h2 {
    font-size: 1rem;
  }
`;

/** 2023-09-12 GroupPage.tsx - 그룹페이지 글 없을 때 사진 */
const GroupNoMindS = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  img {
    width: 7.5rem;
    margin-bottom: 1rem;
  }
  p {
    color: var(--font-color3);
  }
`;
