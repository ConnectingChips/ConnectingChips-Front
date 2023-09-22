import { Mylist, styled, useState } from '../Page/MyPage/MypageBarrel';
import { CurrentMind, EndMindList } from '../Page/MyPage/MypageBarrel';

type ListBind = {
  curList: Mylist[];
  setCurList: React.Dispatch<React.SetStateAction<Mylist[]>>;
};
const ArticleTab = ({ ListBind }: { ListBind: ListBind }): JSX.Element => {
  const compArr: JSX.Element[] = [<CurrentMind ListBind={ListBind} />, <EndMindList ListBind={ListBind}/>];
  const [articleIndex, setArticleIndex] = useState<number>(0);

  return (
    <ArticleTabS>
      <TabHead isFirst={articleIndex === 0} setArticleIndex={setArticleIndex} ListBind={ListBind} />
      {articleIndex === 0 ? compArr[0] : compArr[1]}
    </ArticleTabS>
  );
};

export default ArticleTab;

const TabHead = ({
  isFirst,
  setArticleIndex,
  ListBind,
}: {
  isFirst: boolean;
  setArticleIndex: React.Dispatch<React.SetStateAction<number>>;
  ListBind: ListBind;
}): JSX.Element => {
  const { curList } = ListBind;
  const tabText: string[] = [`참여중인 작심(${curList.length}/3)`, '참여했던 작심'];
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
