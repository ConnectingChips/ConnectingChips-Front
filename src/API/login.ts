import { postData } from './axiosConfig';

/**
 * 로그인 요청 보내는 함수
 * 필요: 아이디, 비밀번호
 * 성공: 200
 * 실패: 아이디/비번 다른 경우
 */
interface Login {
  accessToken: string;
}

export const postLogin = async (id: string, password: string): Promise<Login> => {
  const loginData = { id, password };
  const response = await postData<Login>('/users/login', loginData);
  return response.result;
};
