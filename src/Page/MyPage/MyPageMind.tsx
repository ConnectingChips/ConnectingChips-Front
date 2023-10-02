import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EndMindType } from '../../Type/Mind';
import Arrow_Right from '../../image/Icon/Arrow/Arrow_icon_Right.svg';
import { ConfirmModal, Mylist } from './MypageBarrel';
import { getEndList, getMindAFinished } from '../../API/Mind';
import { putMindExit } from '../../API/joinedMinds';

type ListBind = {
  curList: Mylist[];
  setCurList: React.Dispatch<React.SetStateAction<Mylist[]>>;
};

/** 참여중인 작심 */
export const CurrentMind = ({ ListBind }: { ListBind: ListBind }): JSX.Element => {
  const [confirmExitMind, setConfirmExitMind] = useState<boolean>(false);
  const [mindId, setMindId] = useState<number>(0);

  const { curList, setCurList } = ListBind;
  const isExist = curList.length > 0;

  return (
    <CurrentMindListS>
      {isExist ? (
        <>
          <ExistComp
            myList={curList}
            setConfirmExitMind={setConfirmExitMind}
            setMindId={setMindId}
          />
          {confirmExitMind && (
            <ConfirmModal
              setConfirm={setConfirmExitMind}
              confirmText='작심그룹에서 나가시겠어요?'
              action='나가기'
              method={() => putMindExit(mindId, curList, setCurList)}
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
  const naviagate = useNavigate();

  return (
    <>
      {myList.map((myGroup, idx) => {
        return (
          <MindS key={idx}>
            <p className='main' onClick={() => naviagate(`/groupPage/${myGroup.mindId}`)}>
              {myGroup.name}
            </p>
            <ExitButtonS
              onClick={() => {
                setMindId(myGroup.mindId);
                setConfirmExitMind(true);
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

export const EndMindList = ({ ListBind }: { ListBind: ListBind }): JSX.Element => {
  const [endList, setEndList] = useState<EndMindType[]>();

  useEffect(() => {
    getEndList().then((endMind: EndMindType[]) => setEndList(endMind));
  }, []);

  const isExist = endList && endList.length > 0;

  return (
    <CurrentMindListS>
      {isExist ? <EndMind ListBind={ListBind} /> : <NoneExistComp />}
    </CurrentMindListS>
  );
};

const initEndList: EndMindType[] = [];

const EndMind = ({ ListBind }: { ListBind: ListBind }) => {
  const [endList, setEndList] = useState<EndMindType[]>(initEndList);
  const { curList } = ListBind;
  const navigate = useNavigate();

  useEffect(() => {
    (async () => await getMindAFinished().then((list: EndMindType[]) => setEndList(list)))();
  }, []);

  const ReMindButton = ({ list }: { list: EndMindType }) => {
    return curList.length < 3 && curList.length >= 0 && list.canJoin === 1 ? (
      <ReMindButtonS onClick={() => navigate(`/groupIntro/${list.mindId}`)}>
        다시 참여하기
      </ReMindButtonS>
    ) : (
      <FullJoinButtonS>다시 참여하기</FullJoinButtonS>
    );
  };

  return (
    <>
      {endList.map((list, index) => {
        return (
          <MindS key={index}>
            <p className='main'>{list.name}</p>
            <ReMindButton list={list} />
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
  gap: 0.75rem;

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
    text-overflow: ellipsis;
    white-space: nowrap;
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
  border: 1px solid var(--font-color3);
  width: 5.5rem;
  color: #000;
`;

const ReMindButtonS = styled(myPageButton)`
  background-color: var(--color-main);
  width: 6.9375rem;
`;

const FullJoinButtonS = styled(myPageButton)`
  background-color: var(--color-disabled2);
  color: var(--color-disabled1);
  width: 6.9375rem;
`;
