import { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { putReJoin } from '../../API/joinedMinds';
const GroupBtn = () => {
  const navigate = useNavigate();
  const { mindId } = useParams();
  const [keepJoin, setKeepJoin] = useState<boolean>(false);
  const [isDoneToday, setIsDoneToday] = useState<boolean>(false);

  //TODO: 작심 활동 현황 (main / Page) 완성되면 넣기
  // useEffect(() => {
  //
  // 데이터 받아옴
  //"keepJoin": true,
  // "isDoneToday": true
  // }, []);

  // 버튼 텍스트를 결정하는 함수
  const getButtonText = () => {
    if (!keepJoin) {
      return isDoneToday ? '성공' : '인증';
    } else {
      return '재작심';
    }
  };
  const buttonText = getButtonText();

  const groupBtnHandler = () => {
    if (buttonText === '인증') {
      navigate(`/uploadPost/${mindId}`);
    }
    if (buttonText === '재작심') {
      putReJoin(Number(mindId));
    }
  };

  const buttonLabels = {
    인증: '작심 인증하기',
    성공: '오늘 작심 성공!',
    재작심: '재작심 하기',
  };

  return (
    <div style={{ margin: '0 1rem' }}>
      <GroupBtnContainerS BtnText={buttonText} onClick={groupBtnHandler}>
        {buttonLabels[buttonText]}
      </GroupBtnContainerS>
    </div>
  );
};
export default GroupBtn;

const GroupBtnContainerS = styled.button<{ BtnText: string }>`
  width: 100%;
  height: 2.5rem;
  border-radius: 1.25rem;
  border: 1px solid var(--color-main);
  background: var(--color-white);
  font-size: 0.75rem;
  ${(props) =>
    props.BtnText === '성공' &&
    `
      background: black;
      color: var(--color-main);
      border: 1px solid black;
    `};

  ${(props) =>
    props.BtnText === '재작심' &&
    `
      background: var(--color-main);
    `};
`;
