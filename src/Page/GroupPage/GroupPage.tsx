import { styled } from './GroupPageBarrel';
import { GroupHeader, DivideBaS } from './GroupPageBarrel';
import { GroupPostList } from './GroupPostList';
import { getMindInfo_Page, getMind_PageImage } from '../../API/Mind';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GroupBtn from './GroupBtn';
import {
  GroupArticleS,
  HeadLine,
  IntroduceS,
  initMind,
} from '../../Component/Mission/GroupArticle';
import { MindPageInfo, MindsType } from '../../Type/Mind';

const GroupPage = (): JSX.Element => {
  const { mindId } = useParams<string>();
  const [pageImage, setPageImage] = useState<string>('');
  const [refresh, setRefresh] = useState(1);
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
      <div style={{ margin: '0 auto', width: '375px' }}>
        <GroupArticleS passsort={'Page'}>
          <HeadLine getMindInfoData={getMindInfoData} passsort={'Page'} />
          <IntroduceS passsort={'Page'}>{getMindInfoData.introduce}</IntroduceS>
        </GroupArticleS>
        <GroupBtn refresh={refresh} />
      </div>
      <DivideBaS />
      <GroupPostList refreshBind={refreshBind} />
    </GroupPageS>
  );
};

export default GroupPage;

const GroupPageS = styled.div`
  height: 100dvh;
  width: 100vw;
  margin: 0 auto;
  position: relative;
`;

const GroupImageS = styled.div<{ url: string }>`
  margin-top: 3.5rem;
  background-image: url(${(props) => props.url});
  height: 10rem;
  background-repeat: no-repeat;
  background-size: cover;
`;
