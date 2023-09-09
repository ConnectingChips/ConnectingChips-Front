export type ReplyInfo = {
  reply_id: number;
  username: string;
  profileUrl: string;
  text: string;
  // createdAt : number;
  // updatedAt : number;
};

export type CommentInfo = Omit<ReplyInfo, "reply_id"> & {
  commnet_id: number;
  reply: ReplyInfo[];
};

type Image = {
  image_id: number,
  url: string,
  // createdAt : number;
  // updatedAt : number;
}

export interface PostInfo {
  nickName: string;
  postText: string;
  likedBy: { id: number; username: string }[];
  image: Image[];
  commentList: CommentInfo[];

  // createdAt : number;
  // updatedAt : number;
}
