import { getData, postData, putData, deleteData } from './axiosConfig';
import { GetUser, User } from '../Type/User';
import logText from './logText';
import { NavigateFunction } from 'react-router-dom';

const access_token = localStorage.getItem('access_token');
const tockenHeader = {
  headers: {
    Authorization: `Bearer ${access_token}`,
  },
};

// User 조회 -> GET 요청
export const getUser = async (): Promise<GetUser> => {
  try {
    const response = await getData<GetUser>('/users', tockenHeader);

    // logText(response.data);

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get user');
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
    navigate(-1);
  } catch (error) {
    console.log(3);
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
