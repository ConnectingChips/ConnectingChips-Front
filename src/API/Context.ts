import { createContext } from 'react';

import { Mylist } from '../Type/userMind';
import { GetUser } from '../Type/User';
import { initMyList, initUser } from '../data/initialData';

// MyInfoContext
type MyInfoContextType = {
  myInfo: GetUser;
  setMyInfo: React.Dispatch<React.SetStateAction<GetUser>>;
};
const userContext = {
  myInfo: initUser,
  setMyInfo: () => {},
};
export const MyInfoContext = createContext<MyInfoContextType>(userContext);

// MyListContext
type MyListContextType = {
  myList: Mylist[];
  setMylist: React.Dispatch<React.SetStateAction<Mylist[]>>;
};
const mylistContext = {
  myList: initMyList,
  setMylist: () => {},
};
export const MyListContext = createContext<MyListContextType>(mylistContext);
