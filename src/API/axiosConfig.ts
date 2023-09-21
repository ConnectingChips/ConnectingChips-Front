import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';

// axios.defaults.baseURL = 'https://samchips.com';
// API 테스트 주소
// axios.defaults.baseURL = 'http://dev.samchips.com:8080';
axios.defaults.baseURL = 'http://ec2-13-209-105-30.ap-northeast-2.compute.amazonaws.com:8080';

const client: AxiosInstance = axios.create();

// 인스턴스를 만든 후 기본값 변경하기
client.defaults.headers.common['withCredentials'] = true;

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
    throw new Error(error.message);
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
    throw new Error(error.message);
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
