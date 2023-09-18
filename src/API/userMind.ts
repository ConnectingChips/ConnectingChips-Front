import { getData, postData, putData, deleteData } from './axiosConfig';
import { getUser } from './userService';

const access_token = localStorage.getItem('access_token');
const tockenHeader = {
  headers: {
    Authorization: `Bearer ${access_token}`,
  },
};

type LoggableObject = Mind | isDone | isDoneSingle | Mylist;

function logText(arg: LoggableObject) {
  for (const [key, value] of Object.entries(arg)) {
    console.log(`${key}: ${value}`);
  }
}

export interface Mind {
  id: number;
  mindType: string;
  name: string;
  introduce: string;
  userCount: number;
  writeFormat: string;
  canJoin: number;
  backgroundImage: string;
}

export const getMindAll = async (): Promise<Mind[]> => {
  try {
    const response = await getData<Mind[]>('/minds');

    response.data.forEach((mind) => logText(mind));
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get All Minds');
  }
};

export const getMindSingle = async (mind_id: number): Promise<Mind> => {
  try {
    const response = await getData<Mind>(`/minds/${mind_id}`);

    logText(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get All Minds');
  }
};

interface isDoneSingle {
  isDoneToday: true;
}

interface isDone extends isDoneSingle {
  joinedMindId: number;
}

export const getisDoneAll = async (): Promise<isDone[]> => {
  const user_id = (await getUser()).userId;

  try {
    const response = await getData<isDone[]>(`/minds/today-check/${user_id}`, tockenHeader);

    response.data.map((mind) => logText(mind));
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get isDone All Valid');
  }
};

export const getisDoneSingle = async (joined_mind_id: number): Promise<isDoneSingle> => {
  const user_id = (await getUser()).userId;

  try {
    const response = await getData<isDoneSingle>(
      `/minds/today-check/${joined_mind_id}/${user_id}`,
      tockenHeader,
    );

    logText(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get isDone All Valid');
  }
};

export interface Mylist {
  id: number;
  type: string;
  name: string;
  count: number;
  boardCount: number;
  image: string;
  isDoneToday: boolean;
}

export const getMyList = async (): Promise<Mylist[]> => {
  const user_id = (await getUser()).userId;

  try {
    const response = await getData<Mylist[]>(`/minds/today-check/${user_id}`, tockenHeader);

    response.data.forEach((myList: Mylist) => logText(myList));
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get isDone All Valid');
  }
};
