export type PageSort = 'Page' | 'Intro' | 'Create';

export interface CommonMind {
  mindId: number;
  mindTypeName: string;
  name: string;
  userCount: number;
  introduce: string;
  writeFormat: string;
}

// 그룹페이지 정보
export interface MindPageInfo extends CommonMind {
  isDoneToday: boolean;
  count: 0 | 1 | 2 | 3;
}

// 그룹 소개 정보
export interface MindIntroInfo extends CommonMind {
  canJoin: number;
}

// 전체 작심 리스트 정보
export interface TotalMind extends MindIntroInfo {
  totalListImage: string;
}

// 작심 활동 현황
export interface isDoneSingle {
  isDoneToday: boolean;
  keepJoin: boolean;
}

// 당일 전체 참여한 작심 인증 여부
export interface isDone {
  isDoneToday: boolean;
  joinedMindId: number;
}

// 나의 작심 정보
export interface Mylist {
  mindId: number;
  mindTypeName: string;
  name: string;
  isDoneToday: boolean;
  count: 0 | 1 | 2 | 3;
  boardCount: number;
  myListImage: string;
}

export interface EndMindType {
  mindId: number;
  name: string;
  canJoin: number;
  boardCount: number;
}

export type MindsType = MindPageInfo | MindIntroInfo;
