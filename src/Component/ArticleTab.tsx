import { styled, useState } from '../Page/MyPage/MypageBarrel';

const ArticleTab = ({
  compArr,
  tabText,
}: {
  compArr: JSX.Element[];
  tabText: string[];
}): JSX.Element => {
  const [articleIndex, setArticleIndex] = useState<number>(0);

  return (
    <ArticleTabS>
      <TabHeadS>
        <li className={articleIndex === 0 ? 'selected' : ''} onClick={() => setArticleIndex(0)}>
          {tabText[0]}
        </li>
        <li className={articleIndex === 1 ? 'selected' : ''} onClick={() => setArticleIndex(1)}>
          {tabText[1]}
        </li>
      </TabHeadS>

      {articleIndex === 0 ? compArr[0] : compArr[1]}
    </ArticleTabS>
  );
};

export default ArticleTab;

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
  font-weight: 500;

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
