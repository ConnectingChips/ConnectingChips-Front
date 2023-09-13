import styled from 'styled-components';

// TODO: 사용할 코드
import { fetchMyList } from '../../API/fetchMyList';
import { initMyList } from '../../data/initialData';

// FIXME: 버려질 코드
import { useState } from 'react';
import { myGroupList, myInfo } from '../../data/myInfo';

/** 참여중인 작심 */
export const CurrentMind = (): JSX.Element => {
  return (
    <CurrentMindListS>
      {myGroupList.map((myGroup, idx) => {
        return (
          <MindS key={idx}>
            <p className='main'>{myGroup.title}</p>
            <ExitButtonS>그룹 나가기</ExitButtonS>
          </MindS>
        );
      })}
    </CurrentMindListS>
  );
};

/** 재참여 요청 */
const reJoinFetch = async (mind_id: number) => {
  try {
    await fetch(`/joined-minds/${mind_id}/remind`);
  } catch (error) {
    console.error(error);
  }
};

/** 참여했던 작심 */
export const FinishedMind = (): JSX.Element => {
  return (
    <CurrentMindListS>
      {myGroupList.map((myGroup, index) => {
        const myDate = myGroup.memberList.find((member) => member.member_id === myInfo.my_id)?.day;
        return (
          <MindS key={index}>
            <div>
              <p className='main'>{myGroup.title}</p>
              <p className='sub'>
                <span className='date'>{myDate}</span>일 작심 성공
              </p>
            </div>
            {myGroupList.length >= 3 ? (
              <FullJoinButtonS onClick={() => reJoinFetch(myGroup.group_id)}>
                다시 참여하기
              </FullJoinButtonS>
            ) : (
              <ReMindButtonS>다시 참여하기</ReMindButtonS>
            )}
          </MindS>
        );
      })}
    </CurrentMindListS>
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

  background-color: var(--color-line);
  padding: 1rem;

  box-sizing: border-box;
  height: 4.375rem;
  border-radius: 5px;

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
`;

const ExitButtonS = styled(myPageButton)`
  background-color: #fff;
  border: 1px solid var(--font-color3);
  padding: 0 0.75rem;
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
