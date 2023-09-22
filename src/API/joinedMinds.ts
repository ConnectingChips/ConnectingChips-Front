import { getData, postData, putData } from './axiosConfig';
import logText from './logText';
import { tockenHeader } from '../data/tocken';

// 참여중인 작심인지 반환
export const getCheckedJoined = async (mind_id: number): Promise<boolean> => {
  try {
    const response = await getData<{ isJoining: boolean }>(
      `/joined-minds/${mind_id}/join-check`,
      tockenHeader,
    );

    logText(response.data);
    return response.data.isJoining;
  } catch (error) {
    console.error(error);
    throw new Error('가입한 여부를 확인할 수 없습니다.');
  }
};

// 작심 참여하기 (작심당 1번만 가능)
export const postJoin = async (mind_id: number): Promise<void> => {
  try {
    await postData(`/joined-minds/${mind_id}`, {}, tockenHeader);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to post Join');
  }
};

// 재작심(재참여)하기
export const putReJoin = async (mind_id: number): Promise<void> => {
  try {
    await putData(`/joined-minds/${mind_id}/remind`, {}, tockenHeader);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to put Rejoin');
  }
};

// 참여중인 작심 그만두기
export const putMindExit = async (mind_id: Number): Promise<void> => {
  try {
    await putData(`/joined-minds/${mind_id}/exit`, {}, tockenHeader);
  } catch (error) {
    console.error(error);
    throw new Error('Failed to put Exit Mind');
  }
};
