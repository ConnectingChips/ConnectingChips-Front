interface CommonData {
  id: number;
  type: string;
  name: string;
}

export interface TotalMindData extends CommonData {
  introduce: string;
  userCount: number;
  writeFormat: string;
  canJoin: number;
  backgroundImage: string;
}

export interface TotalMind {
  status: number;
  data: TotalMindData[];
}

export interface MyListData extends CommonData {
  count: number;
  boardCount: number;
  image: string;
  isDoneToday: boolean;
}

export interface MyList {
  status: number;
  data: MyListData[];
}
