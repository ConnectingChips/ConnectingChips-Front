import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Arrow_Right from '../../image/Icon/Arrow/Arrow_icon_Right.svg';
import { ConfirmModal, Mylist } from './MypageBarrel';
import { putMindExit } from '../../API/joinedMinds';
import Bind from '../../Type/Bind';
import { getkeepJoin } from '../GroupPage/GroupPageBarrel';

/** 참여중인 작심 */
export const CurrentMind = ({ ListBind }: { ListBind: Bind<Mylist[]> }): JSX.Element => {
  const [confirmExitMind, setConfirmExitMind] = useState<boolean>(false);
  const [mindId, setMindId] = useState<number>(0);

  const { state: myList, Setter: setMyList } = ListBind;
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
              method={() => putMindExit(mindId, myList, setMyList)}
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

export interface EndMindType {
  mindId: number;
  name: string;
  canJoin: number;
  boardCount: number;
}

export const EndMindList = ({ endList }: { endList: EndMindType[] }): JSX.Element => {
  return (
    <CurrentMindListS>
      {endList.length > 0 ? (
        endList.map((list, index) => <EndMind key={index} list={list} />)
      ) : (
        <NoneExistComp />
      )}
    </CurrentMindListS>
  );
};

const EndMind = ({ list }: { list: EndMindType }) => {
  const navigate = useNavigate();
  const [keepJoinReg, setKeepJoinReg] = useState<boolean>(false);

  (async () => {
    return await getkeepJoin(list.mindId)
      .then((res) => setKeepJoinReg(res.keepJoin))
      .catch((err) => {
        if (err.code === 'ERR_BAD_REQUEST')
          console.log('나의 작심 현황을 호출하는 데 실패했습니다.');
      });
  })();

  return (
    <MindS>
      <p className='main'>{list.name}</p>
      {keepJoinReg ? (
        <ReMindButtonS onClick={() => navigate(`/groupIntro/${list.mindId}`)}>
          다시 참여하기
        </ReMindButtonS>
      ) : (
        <FullJoinButtonS>다시 참여하기</FullJoinButtonS>
      )}
    </MindS>
  );
};

const CurrentMindListS = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  width: 100%;
  max-width: var(--width-max);
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
    overflow: hidden;
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
  box-sizing: content-box;
  background-color: #fff;
  border: 1px solid var(--font-color3);
  padding: 0 0.56rem;
  color: #000;

  min-width: 4.25rem;
  white-space: nowrap;
`;

const ReMindButtonS = styled(myPageButton)`
  box-sizing: content-box;
  background-color: var(--color-main);
  padding: 0 0.94rem;

  min-width: 5.06rem;
  white-space: nowrap;
`;

const FullJoinButtonS = styled(myPageButton)`
  background-color: var(--color-disabled2);
  color: var(--color-disabled1);
  padding: 0 0.94rem;

  min-width: 5.06rem;
  white-space: nowrap;
  box-sizing: content-box;
`;
