import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { EXPIRED_TOKEN } from '../constant/error';

axios.defaults.baseURL = 'https://dev.samchips.com';
axios.defaults.withCredentials = true;

const client: AxiosInstance = axios.create();

client.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.data.code === EXPIRED_TOKEN) {
      try {
        const response = await axios.get('/users/reissue');
        const accessToken = response.data.data.accessToken;
        localStorage.setItem('access_token', accessToken);
        originalRequest.headers.Authorization = 'Bearer ' + accessToken;
        return client(originalRequest);
      } catch (error) {
        localStorage.removeItem('access_token');
        window.location.href = '/';
      }
    }

    return Promise.reject(error);
  },
);

/** Axios Response 데이터 형식
 *  config : 요청에 대한 axios 구성 설정
 *  data 서버가 제공한 응답 데이터
 *  headers : 헤더 정보
 *  request : 요청
 *  status : 응답 HTTP 상태 코드
 *  statusText : 응답 HTTP 상태 메시지
 */

// 본인 서버에서 내려주는 응답 구조
interface APIResponse<T> {
  statusCode: number; // 상태코드 (보인 서버상태코드)
  errorCode: number; // 에러코드 (본인 서버에러코드)
  message: string; // 메시지
  data: T; // 데이터 내용
  timestamp: Date; // 시간
}

//TODO: GET 메서드
export const getData = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<APIResponse<T>> => {
  try {
    const response = await client.get<APIResponse<T>>(url, config);
    return response.data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

//TODO: POST 메서드
export const postData = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<APIResponse<T>> => {
  try {
    const response = await client.post<APIResponse<T>>(url, data, config);
    return response.data;
  } catch (error: any) {
    return Promise.reject(error);
  }
};

//TODO: PUT 메서드
export const putData = async <T>(
  url: string,
  data?: any,
  config?: AxiosRequestConfig,
): Promise<APIResponse<T>> => {
  try {
    const response = await client.put<APIResponse<T>>(url, data, config);
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

//TODO: Delete 메서드
export const deleteData = async <T>(
  url: string,
  config?: AxiosRequestConfig,
): Promise<APIResponse<T>> => {
  try {
    const response = await client.delete<APIResponse<T>>(url, config);
    return response.data;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
