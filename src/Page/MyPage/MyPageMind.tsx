import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { initMyList } from '../../data/initialData';
import { FinishList } from '../../Type/Mind';
import Arrow_Right from '../../image/Icon/Arrow/Arrow_icon_Right.svg';
import { Mylist, getMyList } from './MypageBarrel';
import { getMindAFinished } from '../../API/Mind';
import { putMindExit, putReJoin } from '../../API/joinedMinds';

/** 참여중인 작심 */
export const CurrentMind = (): JSX.Element => {
  const [myList, setMylist] = useState<Mylist[]>(initMyList);

  useEffect(() => {
    getMyList().then((res: Mylist[]) => setMylist(res));
  }, []);

  const isExist = myList.length > 0;
  return (
    <CurrentMindListS>
      {isExist ? <ExistComp myList={myList} /> : <NoneExistComp />}
    </CurrentMindListS>
  );
};

const ExistComp = ({ myList }: { myList: Mylist[] }): JSX.Element => {
  return (
    <>
      {myList.map((myGroup, idx) => {
        return (
          <MindS key={idx}>
            <p className='main'>{myGroup.name}</p>
            <ExitButtonS
              onClick={() => {
                putMindExit(myGroup.mindId)
                  .then(() => {})
                  .catch(() => {});
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
export const FinishedMindList = (): JSX.Element => {
  const [myList, setMylist] = useState<Mylist[]>(initMyList);

  useEffect(() => {
    getMyList().then((res: Mylist[]) => setMylist(res));
  }, []);

  const isExist = myList.length > 0;

  return <CurrentMindListS>{isExist ? <FinishedMind /> : <NoneExistComp />}</CurrentMindListS>;
};

const initFinish: FinishList[] = [];

const FinishedMind = () => {
  const [finishList, setFinishList] = useState<FinishList[]>(initFinish);

  useEffect(() => {
    getMindAFinished().then((list: FinishList[]) => setFinishList(list));
  }, []);

  return (
    <>
      {finishList.map((list, index) => {
        // const myDate = list.data;
        const myDate = 0;
        return (
          <MindS key={index}>
            <div>
              <p className='main'>{list.name}</p>
              <p className='sub'>
                <span className='date'>{myDate}</span>일 작심 성공
              </p>
            </div>
            {finishList.length >= 3 ? (
              <FullJoinButtonS onClick={() => putReJoin(list.mindId)}>
                다시 참여하기
              </FullJoinButtonS>
            ) : (
              <ReMindButtonS>다시 참여하기</ReMindButtonS>
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
