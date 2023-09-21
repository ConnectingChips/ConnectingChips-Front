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
      return isDoneToday ? '오늘작심성공' : '인증하기';
    } else {
      return '재작심하기';
    }
  };
  const buttonText = getButtonText();

  const groupBtnHandler = () => {
    if (buttonText === '인증하기') {
      navigate(`/uploadPost/${mindId}`);
    }
    if (buttonText === '재작심하기') {
      putReJoin(Number(mindId));
    }
  };

  return (
    <GroupBtnContainerS BtnText={buttonText} onClick={groupBtnHandler}>
      {buttonText}
    </GroupBtnContainerS>
  );
};
export default GroupBtn;

const GroupBtnContainerS = styled.button<{ BtnText: string }>`
  width: 100%;
  height: 2.5rem;
  border-radius: 1.25rem;
  border: 1px solid var(--color-main);
  background: var(--color-white);

  ${(props) =>
    props.BtnText === '오늘작심성공' &&
    `
      background: black;
      color: var(--color-main);
      border: 1px solid black;
    `};

  ${(props) =>
    props.BtnText === '재작심하기' &&
    `
      background: var(--color-main);
    `};
`;
