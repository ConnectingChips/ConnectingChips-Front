import { getData, postData, putData, deleteData } from './axiosConfig';

const access_token = localStorage.getItem('access_token');
const tockenHeader = {
  headers: {
    Authorization: `Bearer ${access_token}`,
  },
};

type LoggableObject = { isJoining: true };

function logText(arg: LoggableObject) {
  for (const [key, value] of Object.entries(arg)) {
    console.log(`${key}: ${value}`);
  }
}

export const getMindAll = async (mind_id: number): Promise<{ isJoining: true }> => {
  try {
    const response = await getData<{ isJoining: true }>(
      `/joined-minds/${mind_id}/join-check`,
      tockenHeader,
    );

    logText(response.result);
    return response.result;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get All Minds');
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

export const putReJoin = async (mind_id: number, user_id: number): Promise<void> => {
  try {
    await putData(`/joined-minds/${mind_id}/remind/${user_id}`, tockenHeader);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to put Rejoin');
  }
};

export const putMindExit = async (mind_id: number, user_id: number): Promise<void> => {
  try {
    await putData(`/joined-minds/${mind_id}/exit/${user_id}`, tockenHeader);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to put Rejoin');
  }
};
