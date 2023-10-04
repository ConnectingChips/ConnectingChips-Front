import { styled, useState, useEffect, useParams } from './GroupPageBarrel';
import { GroupHeader, DivideBaS } from './GroupPageBarrel';
import {
  getMindInfo_Page,
  getMind_PageImage,
  GroupBtn,
  GroupArticleS,
  HeadLine,
  IntroduceS,
  initMind,
} from './GroupPageBarrel';
import type { MindPageInfo, MindsType } from './GroupPageBarrel';
import GroupPostList from './Post/GroupPostList';

const GroupPage = (): JSX.Element => {
  const { mindId } = useParams<string>();
  const [pageImage, setPageImage] = useState<string>('');
  const [getMindInfoData, setGetMindInfoData] = useState<MindsType>(initMind);

  useEffect(() => {
    getMind_PageImage(Number(mindId)).then((data) => setPageImage(data.pageImage));
    getMindInfo_Page(Number(mindId)).then((data: MindPageInfo) => setGetMindInfoData(data));
  }, []);

  return (
    <GroupPageS>
      <GroupHeader />
      <GroupImageS url={pageImage} />
      <PageInfo mindData={getMindInfoData} />
      <DivideBaS />

      <GroupPostListS>
        <h2 className='headLine'>작심 인증글</h2>
        <GroupPostList />
      </GroupPostListS>
    </GroupPageS>
  );
};

export default GroupPage;

const PageInfo = ({ mindData }: { mindData: MindsType }) => {
  return (
    <PageInfoS>
      <GroupArticleS passsort={'Page'}>
        <HeadLine getMindInfoData={mindData} passsort={'Page'} />
        <IntroduceS passsort={'Page'}>{mindData.introduce}</IntroduceS>
      </GroupArticleS>
      <GroupBtn />
    </PageInfoS>
  );
};

const GroupPageS = styled.div`
  height: 100dvh;
  width: 100vw;
`;

const GroupImageS = styled.div<{ url: string }>`
  margin-top: 3.5rem;
  background-image: url(${(props) => props.url});
  height: 10rem;
  background-size: cover;
`;

const PageInfoS = styled.div`
  margin: 0 auto;
  max-width: var(--width-max);
`;

const GroupPostListS = styled.div`
  margin: 0 auto;
  max-width: var(--width-max);
  display: flex;
  flex-direction: column;

  h2.headLine {
    font-size: 1.125rem;
    margin-left: 1rem;
    margin-bottom: 0.5rem;
  }
`;
