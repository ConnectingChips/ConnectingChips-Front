import { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { putRemind } from '../../API/joinedMinds';
import { getkeepJoin } from '../../API/Mind';

const buttonLabels = {
  인증: '작심 인증하기',
  성공: '오늘 작심 성공!',
  재작심: '재작심 하기',
};

interface GroupBtnProps {
  refresh: number;
}

const GroupBtn: React.FC<GroupBtnProps> = ({ refresh }) => {
  const navigate = useNavigate();
  const { mindId } = useParams();
  const [keepJoin, setKeepJoin] = useState<boolean>(false);
  const [isDoneToday, setIsDoneToday] = useState<boolean>(false);

  useEffect(() => {
    getkeepJoin(Number(mindId)).then((data) => {
      setKeepJoin(data.keepJoin);
      setIsDoneToday(data.isDoneToday);
    });
  }, [refresh]);

  // 버튼 텍스트를 결정하는 함수
  // const buttonText = !keepJoin ? (isDoneToday ? '성공' : '인증') : '재작심';
  const buttonText = (() => {
    if (!keepJoin && !isDoneToday) return '인증';
    if (keepJoin && !isDoneToday) return '재작심';
    return '성공';
  })();

  const groupBtnHandler = () => {
    if (buttonText === '인증') {
      navigate(`/uploadPost/${mindId}`);
    }
    if (buttonText === '재작심') {
      putRemind(Number(mindId)).then(() => {
        navigate(`/uploadPost/${mindId}`);
      });
    }
  };

  return (
    <GroupBtnWrapper>
      <GroupBtnContainerS buttonText={buttonText} onClick={groupBtnHandler}>
        {buttonLabels[buttonText]}
      </GroupBtnContainerS>
    </GroupBtnWrapper>
  );
};
export default GroupBtn;

const GroupBtnWrapper = styled.div`
  margin: 0 1rem;
`;

const GroupBtnContainerS = styled.button<{ buttonText: string }>`
  width: 100%;
  height: 2.5rem;
  border-radius: 1.25rem;
  border: 1px solid var(--color-main);
  background: var(--color-white);
  font-size: var(--button-mid);
  color: #000;
  ${(props) =>
    props.buttonText === '성공' &&
    `
      background: black;
      color: var(--color-main);
      border: 1px solid black;
    `};

  ${(props) =>
    props.buttonText === '재작심' &&
    `
      background: var(--color-main);
    `};
`;
