import styled from 'styled-components';
import { CurrentMind, FinishedMind } from './MyPageMind';

// FIXME: 버려질 코드
import { useState } from 'react';
import { myGroupList } from '../../data/myInfo';

// TODO: 사용할 코드
import { fetchMyList } from '../../API/fetchMyList'
import { initMyList } from '../../data/initialData';

const MyPageArticle = () => {
  const [articleIndex, setArticleIndex] = useState('CurrentMind');
  const isCurrentMind = articleIndex === 'CurrentMind';

  return (
    <MyPageArticleS>
      <MyPageArticleHead isCurrentMind={isCurrentMind} setArticleIndex={setArticleIndex} />
      {isCurrentMind ? <CurrentMind /> : <FinishedMind />}
    </MyPageArticleS>
  );
};

export default MyPageArticle;

const MyPageArticleHead = ({
  isCurrentMind,
  setArticleIndex,
}: {
  isCurrentMind: boolean;
  setArticleIndex: React.Dispatch<React.SetStateAction<string>>;
}): JSX.Element => {
  return (
    <MyPageArticleHeadS>
      <li
        className={isCurrentMind ? 'selected' : ''}
        onClick={() => setArticleIndex('CurrentMind')}
      >
        참여중인 작심({myGroupList.length}/3)
      </li>
      <li
        className={isCurrentMind ? '' : 'selected'}
        onClick={() => setArticleIndex('FinishedMind')}
      >
        참여했던 작심
      </li>
    </MyPageArticleHeadS>
  );
};

const MyPageArticleS = styled.article`
  &::after {
    content: '';
    display: block;
    height: 0.5rem;
    background-color: var(--color-line);
  }
`;

const MyPageArticleHeadS = styled.ul`
  display: flex;
  height: 3rem;
  margin: 0 1rem;

  li {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--font-color3);
    border-bottom: 0.25rem solid transparent;

    &.selected {
      border-bottom-color: var(--color-main);
      color: var(--font-color1);
    }
  }
`;
