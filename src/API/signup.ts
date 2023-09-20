import { getData, postData } from './axiosConfig';

interface SignupParam {
  id: string;
  email: string;
  nickname: string;
  password: string;
}

interface Signup {
  statusCode: number;
}

interface Duplicated {
  isUsable: boolean;
}

export const postSignup = async (signupParam: SignupParam) => {
  const { id, email, nickname, password } = signupParam;
  const signupData = {
    accountId: id,
    email,
    nickname,
    password,
  };
  const response = await postData<Signup>('/users', signupData);
  return response;
};

export const idDuplicateCheck = async (accountId: string) => {
  const response = await getData<Duplicated>(`/users/check-id?accountId=${accountId}`);
  return response.data.isUsable;
};
