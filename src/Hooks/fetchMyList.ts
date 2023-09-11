import { MyList, MyListData } from '../Type/ListType';
import { TotalMind, TotalMindData } from '../Type/ListType';

type FetchMyListType = (
  setMyList: React.Dispatch<React.SetStateAction<MyListData[]>>,
) => Promise<void>;

type FetchTotalType = (
  setTotalList: React.Dispatch<React.SetStateAction<TotalMindData[]>>,
) => Promise<void>;

/** 나의 작심 호출 */
const fetchMyList: FetchMyListType = async (setMyList) => {
  const result: MyList = await fetch('/minds/my-list').then((res) => res.json());
  setMyList(result.data);
};

/** 나의 작심 호출 */
const fetchTotalList: FetchTotalType = async (setTotalList) => {
  const result: TotalMind = await fetch('/minds').then((res) => res.json());
  setTotalList(result.data);
};

export { fetchMyList, fetchTotalList };
