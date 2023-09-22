import styled from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EndMindType } from '../../Type/Mind';
import Arrow_Right from '../../image/Icon/Arrow/Arrow_icon_Right.svg';
import { ConfirmModal, MyListContext, MyListContextType, Mylist } from './MypageBarrel';
import { getEndList, getMindAFinished } from '../../API/Mind';
import { putMindExit, putReJoin } from '../../API/joinedMinds';

/** 참여중인 작심 */
export const CurrentMind = (): JSX.Element => {
  const { myList, setMylist } = useContext<MyListContextType>(MyListContext);
  // const [myList, setMylist] = useState<Mylist[]>(initMyList);
  const [confirmExitMind, setConfirmExitMind] = useState<boolean>(false);
  const [mindId, setMindId] = useState<number>(0);

  // useEffect(() => {
  //   getMyList().then((res: Mylist[]) => setMylist(res));
  // }, []);
  // console.log('myList: ', myList);

  const isExist = myList.length > 0;
  return (
    <CurrentMindListS>
      {isExist ? (
        <>
          <ExistComp
            myList={myList}
            setConfirmExitMind={setConfirmExitMind}
            setMindId={setMindId}
          />
          {confirmExitMind && (
            <ConfirmModal
              setConfirm={setConfirmExitMind}
              confirmText='작심그룹에서 나가시겠어요?'
              action='나가기'
              method={putMindExit(mindId, myList, setMylist)}
            />
          )}
        </>
      ) : (
        <NoneExistComp />
      )}
    </CurrentMindListS>
  );
};

type ExitButton = {
  myList: Mylist[];
  setConfirmExitMind: React.Dispatch<React.SetStateAction<boolean>>;
  setMindId: React.Dispatch<React.SetStateAction<number>>;
};
const ExistComp = ({ myList, setConfirmExitMind, setMindId }: ExitButton): JSX.Element => {
  return (
    <>
      {myList.map((myGroup, idx) => {
        return (
          <MindS key={idx}>
            <p className='main'>{myGroup.name}</p>
            <ExitButtonS
              onClick={() => {
                setConfirmExitMind(true);
                setMindId(myGroup.mindId);
              }}
            >
              그룹 나가기
            </ExitButtonS>
          </MindS>
        );
      })}
    </>
  );
};

const NoneExistComp = (): JSX.Element => {
  const navigate = useNavigate();

  return (
    <MindS>
      <p className='nonExist'>참여한 작심이 없어요!</p>
      <div onClick={() => navigate('/')} className='findGroup'>
        그룹 둘러보기 <img src={Arrow_Right} alt='Arrow_Right' />
      </div>
    </MindS>
  );
};

/** 참여했던 작심 */
export const EndMindList = (): JSX.Element => {
  const [endList, setEndlist] = useState<EndMindType[]>();

  useEffect(() => {
    getEndList().then((res: EndMindType[]) => setEndlist(res));
  }, []);

  const isExist = endList && endList.length > 0;

  return <CurrentMindListS>{isExist ? <EndMind /> : <NoneExistComp />}</CurrentMindListS>;
};

const initEndList: EndMindType[] = [];

const EndMind = () => {
  const { myList } = useContext<MyListContextType>(MyListContext);
  const [endList, setendList] = useState<EndMindType[]>(initEndList);

  useEffect(() => {
    getMindAFinished().then((list: EndMindType[]) => setendList(list));
  }, []);
  
  return (
    <>
      {endList.map((list, index) => {
        return (
          <MindS key={index}>
            <div>
              <p className='main'>{list.name}</p>
              <p className='sub'>
                <span className='date'>{list.boardCount}</span>일 작심 성공
              </p>
            </div>
            {myList.length < 3 && myList.length >= 0 && list.canJoin === 1 ? (
              <ReMindButtonS onClick={() => putReJoin(list.mindId)}>다시 참여하기</ReMindButtonS>
            ) : (
              <FullJoinButtonS>다시 참여하기</FullJoinButtonS>
            )}
          </MindS>
        );
      })}
    </>
  );
};

const CurrentMindListS = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  margin: 1.25rem 1rem;
`;
const MindS = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;

  background-color: var(--color-bg);
  padding: 1rem;

  box-sizing: border-box;
  height: 4.375rem;
  border-radius: 5px;

  p.nonExist {
    color: var(--color-disabled1);
    font-size: 1rem;
  }

  div.findGroup {
    font-size: var(--button-mid);
  }

  p.main {
    font-size: 1rem;
    font-weight: 500;
  }
  p.sub {
    color: var(--font-color2);

    .date {
      font-weight: 500;
    }
  }
`;

const myPageButton = styled.button`
  height: 2rem;
  border-radius: 1.25rem;
  font-size: var(--button-mid);
`;

const ExitButtonS = styled(myPageButton)`
  background-color: #fff;
  padding: 0 0.75rem;
  border: 1px solid var(--font-color3);
`;

const ReMindButtonS = styled(myPageButton)`
  background-color: var(--color-main);
  padding: 0 1rem;
`;

const FullJoinButtonS = styled(myPageButton)`
  background-color: var(--color-disabled2);
  color: var(--color-disabled1);
  padding: 0 1rem;
`;
