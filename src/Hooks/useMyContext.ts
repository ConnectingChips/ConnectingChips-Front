import { useState } from 'react';
import { GetUser } from '../Type/User';
import { Mylist } from '../Type/Mind';
import { initMyList, initUser } from '../data/initialData';

const useMyContext = () => {
  const [myInfo, setMyInfo] = useState<GetUser>(initUser);
  const [myList, setMylist] = useState<Mylist[]>(initMyList);

  return { myInfo, setMyInfo, myList, setMylist };
};

export default useMyContext;
