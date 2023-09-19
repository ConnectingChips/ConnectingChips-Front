export interface Mind {
  mindId: number;
  mindTypeName: string;
  name: string;
  introduce: string;
  userCount: number;
  writeFormat: string;
  canJoin: number;
}

export interface TotalMind extends Mind {
  totalListImage: string;
}

export interface isDoneSingle {
  isDoneToday: true;
}

export interface isDone extends isDoneSingle {
  joinedMindId: number;
}

export interface Mylist {
  mindId: number;
  mindTypeName: string;
  name: string;
  count: number;
  boardCount: number;
  myListImage: string;
  isDoneToday: boolean;
}

export interface FinishList {
  mindId: number;
  name: string;
  canJoin: number;
}
