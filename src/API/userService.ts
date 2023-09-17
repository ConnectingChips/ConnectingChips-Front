import { getData, postData, putData, deleteData } from './axiosConfig';
const access_token = localStorage.getItem('access_token');
const tockenHeader = {
  headers: {
    Authorization: `Bearer ${access_token}`,
  },
};

// User 데이터 티입
export interface GetUser {
  userId: number;
  nickname: string;
  profileImage: string;
  // roles: "ROLE_USER"
}

// User 조회 -> GET 요청
export const getUser = async (): Promise<GetUser> => {
  try {
    const response = await getData<GetUser>('/users', tockenHeader);
    const { nickname, profileImage } = response.result;
    console.log('nickname: ', nickname);
    console.log('profileImage: ', profileImage);

    return response.result;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get user');
  }
};

interface User {
  accountId: string;
  password: string;
  email: string;
  nickname: string;
}

// User 생성 -> POST 요청
export const createUser = async (newUser: User): Promise<User> => {
  try {
    console.log(4);

    const response = await postData<User>('/users', newUser);
    const createdUser = response.result;
    console.log(5);
    console.log('createdUser: ', createdUser);
    return createdUser;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to create user');
  }
};

// 로그아웃 -> PUT 요청
export const logoutUser = async (): Promise<void> => {
  try {
    const response = await putData('/users/logout', tockenHeader);

    const result = response.result;
    console.log('result: ', result);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to logout');
  }
};

export const ImageUpload = async (data: Object) => {
  try {
    const formData = new FormData();
    const values = Object.values(data);
    Object.keys(data).forEach((key, index) => formData.append(key, values[index]));

    const response = await postData('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data', // 헤더 설정
      },
    });

    console.log(response.result);
  } catch (error) {
    console.error(error);
  }
};
