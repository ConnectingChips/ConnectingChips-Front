import { getData, postData, putData, deleteData } from './axiosConfig';
const access_token = localStorage.getItem('access_token');
const tockenHeader = {
  headers: {
    Authorization: `Bearer ${access_token}`,
  },
};

export interface BoardsType {
  boardId: number;
  userId: number;
  nickname: string;
  content: string;
  profileImage: string;
  createDate: string;
  image: string;
  commentCount: number;
  commentList: CommentType[];
}

export interface CommentType {
  commentId: number;
  userId: number;
  nickname: string;
  content: string;
  profileImage: string;
  createDate: string;
  replyList: ReplyType[];
}

export interface ReplyType {
  replyId: number;
  userId: number;
  nickname: string;
  content: string;
  profileImage: string;
  createDate: string;
}

// boards 조회 -> GET 요청
export const getBoards = async (mind_id: number): Promise<BoardsType[]> => {
  try {
    const response = await getData<BoardsType[]>(`/boards/${mind_id}`);
    // console.log(response.data);

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get user');
  }
};

export interface BoardCheck {
  canEdit: boolean;
}

// 게시글 작성자 여부 -> GET 요청
export const getBoardCheck = async (board_id: string, user_id: string): Promise<BoardCheck> => {
  try {
    const response = await getData<BoardCheck>(
      `/boards/authentication?board_id=${board_id}&user_id=${user_id}`,
      tockenHeader,
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get user');
  }
};

export interface CreateBoard {
  mindId: number;
  userId: number;
  content: string;
  image: {
    name: string;
    file: null | File;
  };
}

//게시글 작성 -> POST요청
export const postCreateBoard = async (BoardData: CreateBoard): Promise<void> => {
  // formData로 전송
  const { mindId, userId, content, image } = BoardData;
  const formData = new FormData();

  formData.append('mindId', String(mindId));
  formData.append('userId', String(userId));

  if (image.file !== null) {
    const blob = new Blob([image.file], { type: 'image/*' });
    formData.append('image', blob);
  }

  if (content) {
    formData.append('content', content);
  }

  try {
    await postData(`/boards`, formData, tockenHeader);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to post Join');
  }
};

export interface EditBoard {
  mindId: number;
  userId: number;
  content: string;
  image: string;
}

export interface RsEditBoard {
  boardId: number;
  content: string;
}

//게시글 수정 -> put요청
export const putEditBoard = async (BoardData: EditBoard): Promise<RsEditBoard> => {
  try {
    const response = await putData<RsEditBoard>(`/boards`, BoardData, tockenHeader);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to post Join');
  }
};

//게시글 삭제 -> delete요청
export const deleteBoard = async (board_id: number): Promise<void> => {
  try {
    await deleteData(`/boards/${board_id}`, tockenHeader);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to delete');
  }
};
