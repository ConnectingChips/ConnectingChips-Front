import { getData, postData, putData, deleteData } from './axiosConfig';

const access_token = localStorage.getItem('access_token');
const tockenHeader = {
  headers: {
    Authorization: `Bearer ${access_token}`,
  },
};

export type LoggableObject = { isJoining: boolean };

function logText(arg: LoggableObject) {
  for (const [key, value] of Object.entries(arg)) {
    console.log(`${key}: ${value}`);
  }
}

export const getCkeckedJoined = async (mind_id: number): Promise<LoggableObject> => {
  try {
    const response = await getData<LoggableObject>(
      `/joined-minds/${mind_id}/join-check`,
      tockenHeader,
    );

    logText(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get checked Joined value');
  }
};

export const postJoin = async (mind_id: number, user_id: number): Promise<void> => {
  try {
    await postData(`/joined-minds/${mind_id}/${user_id}`, tockenHeader);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to post Join');
  }
};

export const putReJoin = async (mind_id: number): Promise<void> => {
  try {
    await putData(`/joined-minds/${mind_id}/remind`, tockenHeader);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to put Rejoin');
  }
};

export const putMindExit = async (mind_id: Number): Promise<void> => {
  try {
    await putData(`/joined-minds/${mind_id}/exit`, tockenHeader);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to put Exit Mind');
  }
};
