import { useRecoilState } from 'recoil';
import {
  CurrentMind,
  EndMindList,
  Mylist,
  styled,
  useEffect,
  useState,
} from '../Page/MyPage/MypageBarrel';
import { myListState } from '../data/initialData';
import { EndMindType } from '../Page/MyPage/MyPageMind';
import { getMindAFinished } from '../API/Mind';

const MyPageArticle = (): JSX.Element => {
  const [myList, setMyList] = useRecoilState<Mylist[]>(myListState);
  const [endList, setEndList] = useState<EndMindType[]>([]);
  const ListBind = { state: myList, Setter: setMyList };

  const [articleIndex, setArticleIndex] = useState<0 | 1>(0);

  useEffect(() => {
    getMindAFinished().then((endMind: EndMindType[]) => setEndList(endMind));
  }, []);

  return (
    <MyPageArticleS>
      {articleIndex === 0 ? (
        <>
          <TabHeadS>
            <li className='selected' onClick={() => setArticleIndex(0)}>
              {`참여중인 작심(${myList.length}/3)`}
            </li>
            <li onClick={() => setArticleIndex(1)}>참여했던 작심</li>
          </TabHeadS>
          <CurrentMind ListBind={ListBind} />
        </>
      ) : (
        <>
          <TabHeadS>
            <li onClick={() => setArticleIndex(0)}>{`참여중인 작심(${myList.length}/3)`}</li>
            <li className='selected' onClick={() => setArticleIndex(1)}>
              참여했던 작심
            </li>
          </TabHeadS>
          <EndMindList endList={endList} />
        </>
      )}
    </MyPageArticleS>
  );
};

export default MyPageArticle;

const MyPageArticleS = styled.article`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: var(--width-max);
  min-width: var(--width-min);
  padding: 0 1rem;
  box-sizing: border-box;
  gap: 1.25rem;
`;

const TabHeadS = styled.ul`
  display: flex;
  height: 3rem;
  font-weight: 500;
  width: 100%;

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
