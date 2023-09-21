import { useEffect, useRef, useState } from 'react';
import { initMyList } from '../data/initialData';

/** 2023-09-02 useMission.ts 나의 작심현황의 데이터/캐러셀 상태 관리 Hook - Kadesti */
const useMission = () => {
  /** 캐러샐 UI 상태 관리 */
  const slideRef = useRef(null);
  const [count, setCount] = useState(0);
  const [sort, setSort] = useState('');

  /** Mylist - 내 작심 삼일 상태 관리 */
  // const [myList, setMyList] = useState(initMyList);
  // useEffect(() => {
  //   // fetchMyList(setMyList);
  // }, []);

  const initCommonData = {
    slideRef,
    count,
    sort,
  };
  const initCarreselData = {
    ...initCommonData,
    setCount,
    setSort,
  };
  const initButtonData = {
    ...initCommonData,
  };

  const [carreselProps, setCarreselProps] = useState(initCarreselData);
  const [buttonProps, setButtonProps] = useState(initButtonData);

  useEffect(() => {
    const commonProps = { slideRef, count, sort };
    const carreselProps = { ...commonProps, setCount, setSort };
    setCarreselProps(carreselProps);

    const buttonListProps = { ...commonProps };
    setButtonProps(buttonListProps);
  }, [count, sort]);

  return { carreselProps, buttonProps };
};

export default useMission;
