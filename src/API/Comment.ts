import { getData, postData, putData, deleteData } from './axiosConfig';
const access_token = localStorage.getItem('access_token');
const tockenHeader = {
  headers: {
    Authorization: `Bearer ${access_token}`,
  },
};

interface AddComment {
  commentId?: number;
  boardId: number;
  userId: number;
  nickname?: string;
  content: string;
  profileImage?: string;
  createDate?: string;
}

//댓글 추가 -> post
export const postAddComment = async (commentData: AddComment): Promise<AddComment> => {
  try {
    const response = await postData<AddComment>(`/comments`, commentData, tockenHeader);
    return response.result;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to post Join');
  }
};

//게시글 삭제 -> delete요청
export const deleteComment = async (comment_id: number): Promise<void> => {
  try {
    await deleteData(`/comments/${comment_id}`, tockenHeader);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to delete');
  }
};

interface AddReply {
  commentId: number;
  replyId?: number;
  userId: number;
  nickname?: string;
  content: string;
  profileImage?: string;
  createDate?: string;
}

// 답글 추가 -> post
export const postAddReply = async (replyData: AddReply): Promise<AddReply> => {
  try {
    const response = await postData<AddReply>(`/replies`, replyData, tockenHeader);
    return response.result;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to post Join');
  }
};

//답글 삭제 -> delete요청
export const deleteReply = async (reply_id: number): Promise<void> => {
  try {
    await deleteData(`/replies/${reply_id}`, tockenHeader);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to delete');
  }
};
