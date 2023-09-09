/** 2023-08-22 MissionType.tsx - 미션 그룹 멤버 정보 */
export interface MemberInfo {
  member_id: string;
  day: number;
  count: number;
  done: boolean;
}

interface Image {
  image_id: number;
  url: string;
  path: string;
}

export interface Post {
  post_id: number;
  title: string;
  image: Image;
}

/** 2023-08-20 MissionType.tsx - 미션 그룹 정보 */
export interface GroupInfoType {
  group_id: number;
  tab: string;
  title: string;
  intro: string;
  rule: string;
  memberList: MemberInfo[];
  posts: Post[];
  defaultImage: {
    defaultImage_id: number;
    main_url?: string;
    list_url?: string;
    intro_url?: string;
    group_url?: string;
    // createdAt: "2023-08-29T13:39:15.087Z",
    // updatedAt: "2023-08-29T13:39:15.100Z",
  };
}

/** 2023-08-21 MissionType.tsx - 작심그룹 리스트 탭 */
export type GroupListTab = {
  tab_id: number;
  title: string;
};

export type PageSort = "Page" | "Intro" | "Create";

export type doneBind = {
  doneList: boolean[];
  setDoneList: React.Dispatch<React.SetStateAction<boolean[]>>;
};
export type countBind = {
  countList: number[];
  setCountList: React.Dispatch<React.SetStateAction<number[]>>;
};
export type uuidBind = {
  uuidList: number[];
  setUuidList: React.Dispatch<React.SetStateAction<number[]>>;
};

interface CommonProps {
  slideRef: React.MutableRefObject<null>;
  count: number;
  sort: string;
  TOTAL_SLIDES: number;
}

export interface CarreselProps extends CommonProps {
  setCount: React.Dispatch<React.SetStateAction<number>>;
  setSort: React.Dispatch<React.SetStateAction<string>>;
  doneBind: doneBind;
  countBind: countBind;
  uuidBind: uuidBind;
}

export interface ButtonListProps extends CommonProps {
  doneList: boolean[];
  uuidList: number[];
  countList: number[];
  IMG: (string | undefined)[];
  // TODO: 값 다 채워지면 아래로 교체
  // IMG: string[];
}
