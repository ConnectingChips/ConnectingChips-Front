import { getData, postData, putData, deleteData } from './axiosConfig';
import { getUser } from './userService';
import { Mind, isDoneSingle, isDone, Mylist, FinishList } from '../Type/userMind';
import logText from './logText';

const access_token = localStorage.getItem('access_token');
const tockenHeader = {
  headers: {
    Authorization: `Bearer ${access_token}`,
  },
};

export const getMindAll = async (): Promise<Mind[]> => {
  try {
    const response =
      access_token !== null
        ? await getData<Mind[]>('/minds/except-me', tockenHeader)
        : await getData<Mind[]>('/minds/not-login');

    // response.data.forEach((mind) => logText(mind));
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get All Minds');
  }
};

export const getMindFilter = async (mindTypeName: string): Promise<Mind[]> => {
  try {
    const response =
      access_token !== null
        ? await getData<Mind[]>(`/minds/except-me/${mindTypeName}`, tockenHeader)
        : await getData<Mind[]>(`/minds/not-login/${mindTypeName}`);

    response.data.forEach((mind) => logText(mind));
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get Filter Minds');
  }
};

export const getMindAFinished = async (): Promise<FinishList[]> => {
  try {
    const response = await getData<FinishList[]>('/minds/my-joined-mind-list', tockenHeader);

    // response.data.forEach((mind) => logText(mind));
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
    throw new Error('Failed to get Single Minds');
  }
};

export const getisDoneAll = async (): Promise<isDone[]> => {
  try {
    const response = await getData<isDone[]>(`/minds/today-check`, tockenHeader);

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
    throw new Error('Failed to get isDone Single Valid');
  }
};

export const putMindRejoin = async (joined_mind_id: number): Promise<void> => {
  const user_id = (await getUser()).userId;

  try {
    await putData<Mylist[]>(`/joined-minds/${joined_mind_id}/remind/${user_id}`, tockenHeader);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to put Rejoin Mind');
  }
};

export const putMindExit = async (joined_mind_id: number): Promise<void> => {
  const user_id = (await getUser()).userId;

  try {
    await putData<Mylist[]>(`/joined-minds/${joined_mind_id}/exit/${user_id}`, tockenHeader);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to put Exit Mind');
  }
};
export const getMyList = async (): Promise<Mylist[]> => {
  const user_id = (await getUser()).userId;

  try {
    const response = await getData<Mylist[]>('/minds/my-list', tockenHeader);

    response.data.forEach((myList: Mylist) => logText(myList));
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get isDone All Valid');
  }
};
