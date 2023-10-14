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
import React from 'react';

const GroupPage = (): JSX.Element => {
  const { mindId } = useParams<string>();
  const [groupPageImg, setGroupPageImg] = useState<string>('');
  const [getMindInfoData, setGetMindInfoData] = useState<MindsType>(initMind);
  useEffect(() => {
    getMind_PageImage(Number(mindId)).then((data) => setGroupPageImg(data.pageImage));
    getMindInfo_Page(Number(mindId)).then((data: MindPageInfo) => setGetMindInfoData(data));
  }, [mindId]);

  return (
    <GroupPageS>
      <GroupHeader />
      <GroupImageS url={groupPageImg} />
      <GroupInfo mindData={getMindInfoData} />
      <DivideBaS />

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
