import { postData } from './axiosConfig';
interface Login {
  accessToken: string;
}

export const postLogin = async (id: string, password: string): Promise<Login> => {
  const loginData = { id, password };
  const response = await postData<Login>('/users/login', loginData);
  return response.data;
};
