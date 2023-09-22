import { styled } from './GroupPageBarrel';
import { GroupHeader, DivideBaS, GroupArticle } from './GroupPageBarrel';
import { GroupPostList } from './GroupPostList';
import { getMind_IntroImage } from '../../API/Mind';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GroupBtn from './GroupBtn';

/** 2023-08-22 GroupPage.tsx - 메인 컴프 */
const GroupPage = (): JSX.Element => {
  const { mindId } = useParams<string>();
  const [pageImage, setPageImage] = useState<string>('');

  useEffect(() => {
    getMind_IntroImage(Number(mindId)).then((data) => {
      setPageImage(data.introImage);
    });
  }, []);

  return (
    <GroupPageS>
      <GroupHeader />
      <GroupImageS url={pageImage} />
      <GroupArticle selected={[0, 1]} passsort='Page' />
      <GroupBtn />
      <DivideBaS />

      <GroupPostList />
    </GroupPageS>
  );
};

export default GroupPage;

const GroupPageS = styled.div`
  width: var(--width-mobile);
  margin-bottom: 3rem;
  position: relative;
`;

/** 2023-08-22 GroupPage.tsx - 그룹페이지 대표 이미지 */
const GroupImageS = styled.div<{ url: string }>`
  background-image: url(${(props) => props.url});
  background-size: 26rem;
  background-position: 0 -1rem;
  height: 10rem;
`;
