import { createContext } from 'react';

import { Mylist } from '../Type/Mind';
import { GetUser } from '../Type/User';
import { initMyList, initUser } from '../data/initialData';

// MyInfoContext
export type MyInfoContextType = {
  myInfo: GetUser;
  setMyInfo: React.Dispatch<React.SetStateAction<GetUser>>;
};
const userContext = {
  myInfo: initUser,
  setMyInfo: () => {},
};
export const MyInfoContext = createContext<MyInfoContextType>(userContext);

// MyListContext
export type MyListContextType = {
  myList: Mylist[];
  setMylist: React.Dispatch<React.SetStateAction<Mylist[]>>;
};
const mylistContext = {
  myList: initMyList,
  setMylist: () => {},
};
export const MyListContext = createContext<MyListContextType>(mylistContext);
