import { getData, postData, putData, deleteData } from './axiosConfig';
import { Mind, isDoneSingle, isDone, Mylist, FinishList, TotalMind } from '../Type/userMind';
import logText from './logText';
import { GroupPageInfo } from '../Type/Group';

const access_token = localStorage.getItem('access_token');
const tockenHeader = {
  headers: {
    Authorization: `Bearer ${access_token}`,
  },
};

// 작심 정보 반환 (그룹 인트로 / 인증하기)
export const getMindInfo_Intro = async (mind_id: number): Promise<Mind> => {
  try {
    const response = await getData<Mind>(`/minds/intro/${mind_id}`);

    // logText(response.data)
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get Minds' Info Intro, Upload");
  }
};

//  작심 정보  이미지반환 (그룹 인트로)
export const getMind_IntroImaage = async (mind_id: number): Promise<{ introImage: string }> => {
  try {
    const response = await getData<{ introImage: string }>(`/minds/intro/${mind_id}/image`);

    // logText(response.data)
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get Minds' Info Intro, Upload");
  }
};

// (그룹 페이지)
export const getMindInfo_Page = async (mind_id: number): Promise<GroupPageInfo> => {
  try {
    const response = await getData<GroupPageInfo>(`/minds/page/${mind_id}`);

    // logText(response.data)
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get Minds' Info Intro, Upload");
  }
};

// 그룹 페이지 이미지 (그룹 페이지)
export const getMind_PageImaage = async (mind_id: number): Promise<{ pageImage: string }> => {
  try {
    const response = await getData<{ pageImage: string }>(`/minds/page/${mind_id}/image`);

    // logText(response.data)
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get Minds' Info Intro, Upload");
  }
};

// 모든 작심 정보 반환 (작심 그룹 리스트) /minds /minds/except-me/{mindTypeName}
export const getMindAll = async (): Promise<TotalMind[]> => {
  try {
    const response =
      access_token !== null
        ? await getData<TotalMind[]>('/minds/except-me', tockenHeader)
        : await getData<TotalMind[]>('/minds');

    // response.data.forEach((mind) => logText(mind));
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('getMindAll 실패함');
  }
};

// 내가 가입한 작심을 제외한 모든 작심반환 /minds/except-me/{mindTypeName}
export const getMindFilter = async (mindTypeName: string): Promise<TotalMind[]> => {
  try {
    const response =
      access_token !== null
        ? await getData<TotalMind[]>(`/minds/except-me/${mindTypeName}`, tockenHeader)
        : await getData<TotalMind[]>(`/minds/not-login/${mindTypeName}`);

    response.data.forEach((mind) => logText(mind));
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('getMindFilter 실패함');
  }
};

// 나의 참여했던 작심 반환
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

// 당일 개별 작심 인증 여부
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

// 당일 전체 참여한 작심 인증 여부
export const getisDoneAll = async (): Promise<isDone[]> => {
  try {
    const response = await getData<isDone[]>(`/minds/today-check`, tockenHeader);

    response.data.map((mind) => logText(mind));
    return response.data;
  } catch (error) {
    // console.error(error);
    throw new Error('getisDoneAll 실패함');
  }
};

// 당일 개별 작심 인증 여부
export const getisDoneSingle = async (joined_mind_id: number): Promise<isDoneSingle> => {
  try {
    const response = await getData<isDoneSingle>(
      `/minds/today-check/${joined_mind_id}`,
      tockenHeader,
    );

    logText(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get isDone Single Valid');
  }
};

// 나의 작심 현황 (나의 작심 현황)
export const getMyList = async (): Promise<Mylist[]> => {
  try {
    const response = await getData<Mylist[]>('/minds/my-list', tockenHeader);

    response.data.forEach((myList: Mylist) => logText(myList));
    return response.data;
  } catch (error) {
    // console.error(error);
    throw new Error('getMyList 실패함');
  }
};
