import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { getkeepJoin } from '../../API/Mind';
import { Arrow_Left_B, Arrow_Left_W, CloseIcon } from '../ArrowBarrel';
import post_Icon from '../../image/Icon/post_Icon.svg';
import post_Icon_locked from '../../image/Icon/post_Icon_locked.svg';

interface GroupHeaderType {
  BGcolor?: string;
  upload?: boolean;
  backBtnColor?: 'black' | 'white';
  text?: string;
  btnType?: 'close';
  btnState?: React.Dispatch<React.SetStateAction<boolean>>;
}

// BGcolor: 헤더배경색(blur가능), upload: 업로드 아이콘 유무, backBtnColor: 뒤로가기 버튼(white,black), text : 중앙텍스트
// BtnType === "close"라면 좌측상단 뒤로가기 버튼 대신 닫기버튼
const GroupHeader = ({
  BGcolor,
  upload,
  backBtnColor,
  text,
  btnType,
  btnState,
}: GroupHeaderType): JSX.Element => {
  const { mindId } = useParams();
  const [isDoneToday, setIsDoneToday] = useState<boolean>(false);

  // 작심 여부에 따른 uploadIcon 활성화 유무 함수
  const UploadIcon = (): JSX.Element => {
    // 당일 작심 여부 api
    useEffect(() => {
      getkeepJoin(Number(mindId)).then((data) => {
        setIsDoneToday(data.isDoneToday);
      });
    }, []);

    return !isDoneToday ? (
      <Link to={`/uploadPost/${mindId}`}>
        <img src={post_Icon} alt='post icon' />
      </Link>
    ) : (
      <img src={post_Icon_locked} alt='post icon' />
    );
  };

  // BGcolor 타입처리 및 블러처리
  if (!BGcolor) {
    BGcolor = 'white';
  } else if (BGcolor === 'blur') {
    BGcolor = '';
  }

  //뒤로가기버튼 색 바꾸는 함수
  const BackIcon = () => (
    <img
      src={btnType === 'close' ? CloseIcon : backBtnColor === 'white' ? Arrow_Left_W : Arrow_Left_B}
      onClick={() => {
        if (btnState) {
          btnState(false);
        } else {
          goBack();
        }
      }}
      alt='Arrow icon'
    />
  );
  return (
    <GroupHeaderContainerS bgcolor={BGcolor} btntype={btnType || ''}>
      <BackIcon />
      <p className='title'>{text}</p>
      {upload ? <UploadIcon /> : <div></div>}
    </GroupHeaderContainerS>
  );
};

const goBack = (): void => window.history.back();

export { GroupHeader, goBack };

export const GroupHeaderContainerS = styled.header<{ bgcolor: string; btntype: string }>`
  background-color: ${(props) => (props.bgcolor ? props.bgcolor : '')};
  z-index: ${(props) => (props.btntype ? 120 : 100)};
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
  .title {
    font-size: 1.25rem;
    font-weight: 500;
  }
`;
