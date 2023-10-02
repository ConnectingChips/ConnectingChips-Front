type Common = {
  userId: number;
  nickname: string;
  content: string;
  profileImage: string;
  createDate: string;
};

// 답글 정보
export type Reply = Common & {
  replyId: number;
};

// 댓글 정보
export type Comment = Common & {
  commentId: number;
  replyList: Reply[];
};

// 글 정보
export type Board = Common & {
  boardId: number;
  image: string;
  commentCount: number;
  commentList: Comment[];
};
