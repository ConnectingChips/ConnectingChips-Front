import { postData, deleteData } from './axiosConfig';
import getToken from '../data/tocken';

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
    const { tockenHeader } = getToken();
    const response = await postData<AddComment>(`/comments`, commentData, tockenHeader);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to post Join');
  }
};

//댓글 삭제 -> delete요청
export const deleteComment = async (comment_id: number): Promise<void> => {
  try {
    const { tockenHeader } = getToken();
    await deleteData(`/comments/${comment_id}`, tockenHeader);
  } catch (error) {
    console.error(error);
    throw new Error('댓글 삭제 에러');
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
    const { tockenHeader } = getToken();
    const response = await postData<AddReply>(`/replies`, replyData, tockenHeader);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('답글 추가 에러');
  }
};

//답글 삭제 -> delete요청
export const deleteReply = async (reply_id: number): Promise<void> => {
  try {
    const { tockenHeader } = getToken();
    await deleteData(`/replies/${reply_id}`, tockenHeader);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to delete');
  }
};
