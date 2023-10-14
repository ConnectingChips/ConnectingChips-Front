import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import { Arrow_Left_B, Arrow_Left_W } from '../ArrowBarrel';
import post_Icon from '../../image/Icon/post_Icon.svg';
import post_Icon_locked from '../../image/Icon/post_Icon_locked.svg';
import { Link, useLocation, useParams } from 'react-router-dom';
import { getkeepJoin } from '../../API/Mind';
import { useRecoilState } from 'recoil';
import { refreshState } from '../../data/initialData';

/** 2023-08-25 GroupHeader.tsx - 그룹 페이지 헤더 */
const GroupHeader = (): JSX.Element => {
  const path = useLocation().pathname;
  const isUpload = path.indexOf('/upload') !== -1;
  const { mindId } = useParams();
  const [isDoneToday, setIsDoneToday] = useState<boolean>(false);
  const [refresh] = useRecoilState<number>(refreshState);

  useEffect(() => {
    getkeepJoin(Number(mindId)).then((data) => {
      setIsDoneToday(data.isDoneToday);
    });
  }, [refresh, mindId]);

  const UploadIcon = (): JSX.Element => {
    return isUpload ? (
      <></>
    ) : !isDoneToday ? (
      <Link to={`/uploadPost/${mindId}`}>
        <img src={post_Icon} alt='post icon' />
      </Link>
    ) : (
      <img src={post_Icon_locked} alt='post icon' />
    );
  };

  return (
    <GroupHeaderContainerS>
      <BackIcon />
      <UploadIcon />
    </GroupHeaderContainerS>
  );
};

const GroupIntroHeader = (): JSX.Element => {
  return (
    <GroupHeaderS onClick={goBack}>
      <img src={Arrow_Left_W} alt='Arrow icon' />
    </GroupHeaderS>
  );
};

const goBack = (): void => window.history.back();
const BackIcon = () => <img src={Arrow_Left_B} onClick={goBack} alt='Arrow icon' />;

export { GroupHeader, GroupIntroHeader, goBack, BackIcon };

/** 2023-08-22 GroupHeader.tsx - 그룹 인트로 뒤로가기 */
export const GroupHeaderS = styled.header`
  position: fixed;
  display: flex;
  align-items: center;
  padding: 1rem;
  top: 0;
  box-sizing: border-box;
  height: var(--height-header);
`;

/** 2023-08-22 GroupHeader.tsx - 그룹페이지 상단 고정 */
export const GroupHeaderContainerS = styled(GroupHeaderS)`
  width: 100vw;
  height: var(--height-header);
  justify-content: space-between;
  background-color: white;
  z-index: 20;
  top: 0;
`;
