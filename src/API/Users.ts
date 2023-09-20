import { getData, postData, putData, deleteData } from './axiosConfig';
import { GetUser, User } from '../Type/User';
import logText from './logText';
import { NavigateFunction } from 'react-router-dom';
import { tockenHeader } from '../data/tocken';

type IsLogin = {
  isLogin: boolean;
};

// 로그인한 유저인지 확인
export const getIsLogined = async (): Promise<boolean> => {
  try {
    const response = await getData<IsLogin>('/users/check-login', tockenHeader);
    return response.data.isLogin;
  } catch (error) {
    throw new Error('This user is not Logined');
  }
};

// 로그인한 유저 정보 조회
export const getUser = async (): Promise<GetUser> => {
  try {
    const response = await getData<GetUser>('/users', tockenHeader);

    // logText(response.data);
    return response.data;
  } catch (error) {
    throw new Error('유저 정보 호출에 실패하였습니다');
  }
};

// User 생성 -> POST 요청
export const createUser = async (newUser: User): Promise<User> => {
  try {
    const response = await postData<User>('/users', newUser);

    logText(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to create user');
  }
};

// 로그아웃 -> PUT 요청
export const logoutUser = async (navigate: NavigateFunction): Promise<void> => {
  try {
    // await putData('/users/logout', tockenHeader);
    localStorage.clear();
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

    const response = await postData('/upload', formData, tockenHeader);

    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

// 유저 정보 수정
export const putUserEdit = async (): Promise<GetUser> => {
  try {
    const response = await getData<GetUser>('/users', tockenHeader);

    // logText(response.data);

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get user');
  }
};
