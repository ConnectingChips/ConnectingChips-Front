// TODO: 갈아끼울 코드
// import { useEffect, useRef, useState } from 'react';

// FIXME: 버려질 코드
import { useEffect, useMemo, useRef, useState } from 'react';

// TODO: 갈아끼울 코드
import { fetchMyList } from './fetchMyList';
import { initMyList } from '../data/initialData';

// FIXME: 버려질 코드
import { myGroupImages } from '../data/myInfo';

/** 2023-09-02 useMission.ts 나의 작심현황의 데이터/캐러셀 상태 관리 Hook - Kadesti */
const useMission = () => {
  /** 캐러샐 UI 상태 관리 */
  const slideRef = useRef(null);
  const [count, setCount] = useState(0);
  const [sort, setSort] = useState('');

  // FIXME: 버려질 코드
  /** Mylist - 내 작심 삼일 상태 관리 */
  const [doneList, setDoneList] = useState([false]);
  const [countList, setCountList] = useState([0]);
  const [uuidList, setUuidList] = useState([0]);

  // TODO: 네트워크 데이터로 교체될 부분
  /** Mylist - 내 작심 삼일 상태 관리 */
  // const [myList, setMyList] = useState(initMyList.data);
  // useEffect(() => {
  //   // fetchMyList(setMyList);
  // }, []);

  // TODO: 네트워크 데이터로 교체될 부분
  // const IMG = myList.map((mind) => mind.image);

  // FIXME: 버려질 코드
  const IMG = myGroupImages;

  // const IMGLen = IMG.slice(1);
  const TOTAL_SLIDES = IMG.length - 1;

  // FIXME: 버려질 코드
  const doneBind = useMemo(() => {
    return { doneList, setDoneList };
  }, [doneList]);

  const countBind = useMemo(() => {
    return { countList, setCountList };
  }, [countList]);

  const uuidBind = useMemo(() => {
    return { uuidList, setUuidList };
  }, [uuidList]);

  const initCommonData = {
    slideRef,
    count,
    sort,
    TOTAL_SLIDES,
  };
  const initCarreselData = {
    ...initCommonData,
    setCount,
    setSort,
    // FIXME: 버려질 코드
    doneBind,
    countBind,
    uuidBind,
  };
  const initButtonData = {
    ...initCommonData,
    // FIXME: 버려질 코드
    doneList,
    uuidList,
    countList,
    IMG,
  };

  const [carreselProps, setCarreselProps] = useState(initCarreselData);
  const [buttonDataProps, setButtonDataProps] = useState(initButtonData);

  useEffect(() => {
    const commonProps = { slideRef, count, sort, TOTAL_SLIDES };
    // TODO: 갈아끼울 코드
    // const carreselProps = { ...commonProps, setCount, setSort };

    // FIXME: 버려질 코드
    // const carreselProps = { ...commonProps, setCount, setSort };
    const carreselProps = { ...commonProps, setCount, setSort, doneBind, countBind, uuidBind };
    setCarreselProps(carreselProps);

    // TODO: 갈아끼울 코드
    // const buttonListProps = { ...commonProps, IMG };

    // FIXME: 버려질 코드
    // const buttonListProps = { ...commonProps, IMG };
    const buttonListProps = { ...commonProps, IMG, doneList, uuidList, countList };
    setButtonDataProps(buttonListProps);
    // TODO: 갈아끼울 코드
    // }, [IMG, TOTAL_SLIDES, count, sort]);

    // FIXME: 버려질 코드
  }, [
    IMG,
    TOTAL_SLIDES,
    count,
    countBind,
    countList,
    doneBind,
    doneList,
    sort,
    uuidBind,
    uuidList,
  ]);

  return { carreselProps, buttonDataProps };
};

export default useMission;
