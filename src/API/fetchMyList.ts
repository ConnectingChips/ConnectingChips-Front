import { MyListDummy, MyListData } from '../Type/ListType';
import { TotalMind, TotalMindData } from '../Type/ListType';

type FetchMyListType = (
  setMyList: React.Dispatch<React.SetStateAction<MyListData[]>>,
) => Promise<void>;

type FetchTotalType = (
  setTotalList: React.Dispatch<React.SetStateAction<TotalMindData[]>>,
) => Promise<void>;

/** 나의 작심 호출 */
const fetchMyList: FetchMyListType = async (setMyList) => {
  try {
    const result: MyListDummy = await fetch('/minds/my-list').then((res) => res.json());
    setMyList(result.data);
  } catch (error) {
    console.error(error);
  }
};

/** 나의 작심 호출 */
const fetchTotalList: FetchTotalType = async (setTotalList) => {
  try {
    const result: TotalMind = await fetch('/minds').then((res) => res.json());
    setTotalList(result.data);
  } catch (error) {
    console.error(error);
  }
};

export { fetchMyList, fetchTotalList };
