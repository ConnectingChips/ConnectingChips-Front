import { getData, postData, putData } from './axiosConfig';
import { getToken } from '../data/tocken';
import { Mylist } from '../Type/Mind';

// 참여중인 작심인지 반환
export const getCheckedJoined = async (mind_id: number): Promise<boolean> => {
  const { tockenHeader } = getToken();
  try {
    const response = await getData<{ isJoining: boolean }>(
      `/joined-minds/${mind_id}/join-check`,
      tockenHeader,
    );

    return response.data.isJoining;
  } catch (error) {
    console.error(error);
    throw new Error('가입한 여부를 확인할 수 없습니다.');
  }
};

// 작심 참여하기 (작심당 1번만 가능) // 재참여하기도 가능
export const postJoin = async (mind_id: number): Promise<void> => {
  try {
    const { tockenHeader } = getToken();
    await postData(`/joined-minds/${mind_id}`, {}, tockenHeader);
  } catch (error) {
    // console.error(error);
    return Promise.reject(error);
  }
};

// 참여중인 작심 그만두기
export const putMindExit = async (
  mindId: number,
  myList: Mylist[],
  setMylist: React.Dispatch<React.SetStateAction<Mylist[]>>,
): Promise<void> => {
  try {
    const { tockenHeader } = getToken();
    await putData(`/joined-minds/${mindId}/exit`, {}, tockenHeader);
    const exitList = myList.filter((mind) => mind.mindId !== mindId);
    setMylist(exitList);
  } catch (error) {
    console.error(error);
    throw new Error('작심을 그만둘 수 없습니다');
  }
};
