import { useState } from 'react';
import styled from 'styled-components';

/**
 * 탭에 해당하는 컴텐츠를 보여주는 컴포넌트(마이페이지, 그룹페이지)
 * @param tabText 탭 이름 배열
 * @param compArr 탭에 해당하는 컴포넌트 배열
 */
const ArticleTab = ({ tabText, compArr }: { tabText: string[]; compArr: JSX.Element[] }) => {
  const [articleIndex, setArticleIndex] = useState(0);

  return (
    <ArticleTabS>
      <TabHead
        isFirst={articleIndex === 0}
        setArticleIndex={setArticleIndex}
        tabText={tabText}
      />
      {articleIndex === 0 ? compArr[0] : compArr[1]}
    </ArticleTabS>
  );
};

export default ArticleTab;

const TabHead = ({
  isFirst,
  setArticleIndex,
  tabText,
}: {
  isFirst: boolean;
  setArticleIndex: React.Dispatch<React.SetStateAction<number>>;
  tabText: string[];
}): JSX.Element => {
  return (
    <TabHeadS>
      <li className={isFirst ? 'selected' : ''} onClick={() => setArticleIndex(0)}>
        {tabText[0]}
      </li>
      <li className={isFirst ? '' : 'selected'} onClick={() => setArticleIndex(1)}>
        {tabText[1]}
      </li>
    </TabHeadS>
  );
};

const ArticleTabS = styled.article`
  &::after {
    content: '';
    display: block;
    height: 0.5rem;
    background-color: var(--color-line);
  }
`;

const TabHeadS = styled.ul`
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
