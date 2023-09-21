import { getData, postData } from './axiosConfig';
import { GetUser, User } from '../Type/User';
import logText from './logText';
import { getToken } from '../data/tocken';

type IsLogin = {
  isLogin: boolean;
};

// 로그인한 유저인지 확인
export const getIsLogined = async (): Promise<boolean> => {
  try {
    const { tokenValue } = getToken();
    const response = await getData<IsLogin>('/users/check-login', tokenValue);

    // console.log('isLogin: ', response.data.isLogin);
    return response.data.isLogin;
  } catch (error) {
    throw new Error('This user is not Logined');
  }
};

// 로그인한 유저 정보 조회
export const getUser = async (): Promise<GetUser> => {
  try {
    const { tockenHeader } = getToken();
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
export const logoutUser = async (): Promise<void> => {
  try {
    // await putData('/users/logout', tockenHeader(access_token))
    // localStorage.removeItem('access_token');
    
    localStorage.clear();
    console.log(1);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to logout');
  }
};

// 유저 정보 수정
export const putUserEdit = async (): Promise<GetUser> => {
  try {
    const { tockenHeader } = getToken();
    const response = await getData<GetUser>('/users', tockenHeader);

    // logText(response.data);

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get user');
  }
};
