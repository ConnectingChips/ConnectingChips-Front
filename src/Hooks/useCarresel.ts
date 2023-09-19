import { useEffect, useRef, useState } from 'react';

/** 2023-09-02 useMission.ts 나의 작심현황의 데이터/캐러셀 상태 관리 Hook - Kadesti */
const useMission = () => {
  /** 캐러샐 UI 상태 관리 */
  const slideRef = useRef(null);
  const [count, setCount] = useState(0);
  const [sort, setSort] = useState('');

  const initButtonData = {
    slideRef,
    count,
    sort,
  };
  const initCarreselData = {
    ...initButtonData,
    setCount,
    setSort,
  };

  const [buttonDataProps, setButtonDataProps] = useState(initButtonData);
  const [carreselProps, setCarreselProps] = useState(initCarreselData);

  useEffect(() => {
    const buttonListProps = { slideRef, count, sort };
    const carreselProps = { ...buttonListProps, setCount, setSort };
    setCarreselProps(carreselProps);
    setButtonDataProps(buttonListProps);
  }, [count, sort]);

  return { carreselProps, buttonDataProps };
};

export default useMission;
