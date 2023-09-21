// 그룹페이지 정보
export interface MindPageInfo {
  mindId: number;
  mindTypeName: string;
  name: string;
  userCount: number;
  writeFormat: string;
  doneToday: boolean;
  count: 0 | 1 | 2 | 3;
}

// 그룹 소개 정보
export interface MindIntroInfo {
  mindId: number;
  mindTypeName: string;
  name: string;
  introduce: string;
  userCount: number;
  writeFormat: string;
  canJoin: number;
}

// 전체 작심 리스트 정보
export interface TotalMind extends MindIntroInfo {
  totalListImage: string;
}

export interface isDoneSingle {
  isDoneToday: true;
}

export interface isDone extends isDoneSingle {
  joinedMindId: number;
}

// 나의 작심 정보
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

// 그룹 인트로 + 페이지 - FIXME: 고도화때 삭제
export interface MindsType {
  mindId: number;
  mindTypeName: string;
  name: string;
  introduce: string;
  userCount: number;
  writeFormat?: string;
  isDoneToday?: boolean;
  count?: number;
  canJoin?: number;
}
