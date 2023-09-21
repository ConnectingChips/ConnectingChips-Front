// 답글 정보
export type Reply = {
  replyId: number;
  userId: number;
  nickname: string;
  content: string;
  profileImage: string;
  createDate: string;
};

// 댓글 정보
export type Comment = {
  commentId: 2;
  userId: 2;
  nickname: string;
  content: string;
  profileImage: string;
  createDate: string;
  replyList: Reply[];
};

// 글 정보
export type Board = {
  boardId: number;
  userId: number;
  nickname: string;
  content: string;
  profileImage: string;
  createDate: string;
  image: string;
  commentCount: number;
  commentList: Comment[];
};
