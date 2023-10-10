import { getData, postData, putData, deleteData } from './axiosConfig';
import getToken from '../data/tocken';
import { getUser } from './Users';

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
  commentId?: number;
  replyId?: number;
  userId: number;
  nickname: string;
  content: string;
  profileImage: string;
  createDate: string;
  replyList?: ReplyType[];
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
export const getBoards = async (mindId: number): Promise<BoardsType[]> => {
  try {
    const response = await getData<BoardsType[]>(`/boards/${mindId}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('게시글 리스트 반환 에러');
  }
};

export interface BoardCheck {
  canEdit: boolean;
}

// 게시글 작성자 여부 -> GET 요청
export const getBoardCheck = async (boardId: number): Promise<BoardCheck> => {
  const user_id = (await getUser()).userId;
  try {
    const { tockenHeader } = getToken();
    const response = await getData<BoardCheck>(
      `/boards/authentication?board_id=${boardId}&user_id=${user_id}`,
      tockenHeader,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('게시글 작성자 여부 에러');
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
interface PostCreateBoardType {
  statusCode: number;
}

export const postCreateBoard = async (BoardData: CreateBoard): Promise<PostCreateBoardType> => {
  const { mindId, userId, content, image } = BoardData;
  const formData = new FormData();
  const boardRequestDto = { mindId, userId, content };
  const { tockenHeader } = getToken();

  formData.append(
    'boardRequestDto',
    new Blob([JSON.stringify(boardRequestDto)], { type: 'application/json' }),
  );

  if (image.file !== null) {
    formData.append('file', image.file);
  }

  try {
    const response = await postData<PostCreateBoardType>(`/boards`, formData, tockenHeader);
    return response;
  } catch (error) {
    return Promise.reject(error);
  }
};

export interface EditBoard {
  mindId: number;
  userId: number;
  content: string;
  image: string;
}

export interface RsEditBoard {
  // boardId: number;
  content: string;
}

//게시글 수정 -> put요청
export const putEditBoard = async (boardId: number, content: RsEditBoard): Promise<RsEditBoard> => {
  try {
    const { tockenHeader } = getToken();
    const response = await putData<RsEditBoard>(`/boards/${boardId}`, content, tockenHeader);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('게시글 수정 에러');
  }
};

//게시글 삭제 -> delete요청
export const deleteBoard = async (boardId: number): Promise<void> => {
  try {
    const { tockenHeader } = getToken();
    await deleteData(`/boards/${boardId}`, tockenHeader);
  } catch (error) {
    console.error(error);
    throw new Error('게시글 삭제 애러');
  }
};
