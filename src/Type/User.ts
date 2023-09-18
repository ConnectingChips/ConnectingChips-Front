const enum Gender {
  male = "male",
  female = "female",
}

export interface User {
  my_id: number;
  password: string;
  nickname: number;
  birthDate: string;
  gender: Gender;
  yearAndMonthOfEmployment: string;
  companyEmail?: string;
  job?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface Admin {
  id: number;
  email: string;
  password: string;
}

export type MyInfoType = {
  my_id: string;
  password: string;
  profileimg: string;
};

