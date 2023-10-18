import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { getkeepJoin } from '../../API/Mind';
import { useRecoilState } from 'recoil';
import { refreshState } from '../../data/initialData';
import { Arrow_Left_B, Arrow_Left_W } from '../ArrowBarrel';
import post_Icon from '../../image/Icon/post_Icon.svg';
import post_Icon_locked from '../../image/Icon/post_Icon_locked.svg';

interface GroupHeaderType {
  BGcolor?: string;
  upload?: boolean;
  backBtnColor?: 'black' | 'white';
  text?: string;
}
// 그룹페이지 헤더
// 배경색 : blur or color
// 글쓰기 아이콘 유무
// 뒤로가기 버튼 white or black
// 중앙 텍스트
const GroupHeader = ({ BGcolor, upload, backBtnColor, text }: GroupHeaderType): JSX.Element => {
  const { mindId } = useParams();
  const [isDoneToday, setIsDoneToday] = useState<boolean>(false);
  const [refresh] = useRecoilState<number>(refreshState);

  if (!BGcolor) {
    BGcolor = 'white';
  } else if (BGcolor === 'blur') {
    BGcolor = '';
  }

  useEffect(() => {
    getkeepJoin(Number(mindId)).then((data) => {
      setIsDoneToday(data.isDoneToday);
    });
  }, [refresh, mindId]);

  const UploadIcon = (): JSX.Element => {
    return !isDoneToday ? (
      <Link to={`/uploadPost/${mindId}`}>
        <img src={post_Icon} alt='post icon' />
      </Link>
    ) : (
      <img src={post_Icon_locked} alt='post icon' />
    );
  };

  const goBack = (): void => window.history.back();
  const BackIcon = () => (
    <img
      src={backBtnColor === 'white' ? Arrow_Left_W : Arrow_Left_B}
      onClick={goBack}
      alt='Arrow icon'
    />
  );
  return (
    <GroupHeaderContainerS BGcolor={BGcolor}>
      <BackIcon />
      <p className='title'>{text}</p>
      {upload ? <UploadIcon /> : <div></div>}
    </GroupHeaderContainerS>
  );
};

const goBack = (): void => window.history.back();

export { GroupHeader, goBack };

export const GroupHeaderContainerS = styled.header<{ BGcolor: string }>`
  position: fixed;
  display: flex;
  align-items: center;
  padding: 1rem;
  top: 0;
  left: 0;
  box-sizing: border-box;
  height: var(--height-header);
  width: 100vw;
  justify-content: space-between;
  z-index: 100;
  background-color: ${(props) => (props.BGcolor ? props.BGcolor : '')};
  .title {
    font-size: 1.25rem;
    font-weight: 500;
  }
`;
