import { styled, useState, useEffect, useParams } from './GroupPageBarrel';
import { GroupHeader, DivideBaS } from './GroupPageBarrel';
import {
  GroupPostList,
  getMindInfo_Page,
  getMind_PageImage,
  GroupBtn,
  GroupArticleS,
  HeadLine,
  IntroduceS,
  initMind,
} from './GroupPageBarrel';
import type { MindPageInfo, MindsType } from './GroupPageBarrel';

const GroupPage = (): JSX.Element => {
  const { mindId } = useParams<string>();
  const [pageImage, setPageImage] = useState<string>('');
  const [refresh, setRefresh] = useState<number>(1);
  const refreshBind = { refresh, setRefresh };
  const [getMindInfoData, setGetMindInfoData] = useState<MindsType>(initMind);

  useEffect(() => {
    getMind_PageImage(Number(mindId)).then((data) => setPageImage(data.pageImage));
    getMindInfo_Page(Number(mindId)).then((data: MindPageInfo) => setGetMindInfoData(data));
  }, []);

  return (
    <GroupPageS>
      <GroupHeader refresh={refresh} />
      <GroupImageS url={pageImage} />
      <PageInfo mindData={getMindInfoData} refresh={refresh} />
      <DivideBaS />
      <GroupPostList refreshBind={refreshBind} />
    </GroupPageS>
  );
};

export default GroupPage;

const PageInfo = ({ mindData, refresh }: { mindData: MindsType; refresh: number }) => {
  return (
    <PageInfoS>
      <GroupArticleS passsort={'Page'}>
        <HeadLine getMindInfoData={mindData} passsort={'Page'} />
        <IntroduceS passsort={'Page'}>{mindData.introduce}</IntroduceS>
      </GroupArticleS>
      <GroupBtn refresh={refresh} />
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
