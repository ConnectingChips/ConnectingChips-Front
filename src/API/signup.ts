// signup.ts
import { postData } from './axiosConfig';

interface Signup {
  accountId: string;
  email: string;
  nickname: string;
  password: string;
}

interface SignupParam extends Omit<Signup, 'accountId'> {
  id: string;
}

export const postSignup = async (signupParam: SignupParam) => {
  const { id, email, nickname, password } = signupParam;
  const signupData = {
    accountId: id,
    email,
    nickname,
    password,
  };
  // TODO: 확인하고 주석 삭제
  console.log('Test: ', test);
  const response = await postData<Signup>('/users', signupData);
  return response;
};
