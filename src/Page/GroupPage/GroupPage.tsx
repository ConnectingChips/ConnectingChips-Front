import { styled, useState, useEffect, useParams } from './GroupPageBarrel';
import { GroupHeader } from './GroupPageBarrel';
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
  const [groupPageImg, setGroupPageImg] = useState<string>('');
  const [getMindInfoData, setGetMindInfoData] = useState<MindsType>(initMind);

  // 그룹페이지 이미지와 소개글 데이터를 가져오는 api
  useEffect(() => {
    getMind_PageImage(Number(mindId)).then((data) => setGroupPageImg(data.pageImage));
    getMindInfo_Page(Number(mindId)).then((data: MindPageInfo) => setGetMindInfoData(data));
  }, [mindId]);

  return (
    <GroupPageS>
      <GroupHeader upload={true} />
      <GroupImageS url={groupPageImg} />
      <GroupInfo mindData={getMindInfoData} />
      <GroupPostList />
    </GroupPageS>
  );
};

export default GroupPage;

const GroupInfo = ({ mindData }: { mindData: MindsType }) => {
  return (
    <GroupInfoS>
      <GroupArticleS passsort={'Page'}>
        <HeadLine getMindInfoData={mindData} passsort={'Page'} />
        <IntroduceS passsort={'Page'}>{mindData.introduce}</IntroduceS>
      </GroupArticleS>
      <GroupBtn />
    </GroupInfoS>
  );
};

const GroupPageS = styled.div`
  height: 100dvh;
  width: 100vw;
`;

const GroupImageS = styled.div<{ url: string }>`
  margin-top: var(--height-header);
  background-image: url(${(props) => props.url});
  height: 10rem;
  background-size: cover;
`;

const GroupInfoS = styled.div`
  margin: 0 auto;
  max-width: var(--width-max);
`;
