export type GroupListTab = {
  tab_id: number;
  title: string;
};

const missionTab: GroupListTab[] = [
  {
    tab_id: 0,
    title: '전체',
  },
  {
    tab_id: 1,
    title: '일상',
  },
  {
    tab_id: 2,
    title: '달리기',
  },
  {
    tab_id: 3,
    title: '헬스',
  },
  {
    tab_id: 4,
    title: '자전거',
  },
];

export { missionTab };
