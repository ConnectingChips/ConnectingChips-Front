import { getData } from './axiosConfig';
import { Mind, isDoneSingle, isDone, Mylist, FinishList, TotalMind } from '../Type/userMind';
import logText from './logText';
import { GroupPageInfo } from '../Type/Group';
import { tockenHeader, tokenValue } from '../data/tocken';

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
    const response = await getData<TotalMind[]>('/minds/except-me', tokenValue);

    // response.data.forEach((mind) => logText(mind));
    return response.data;
  } catch (error) {
    throw new Error('모든 작심 정보를 반환하는데 실패했습니다.');
  }
};

// 2 : 일상 / 3 : 달리기 / 4 : 헬스 / 5 : 자전거
// 내가 가입한 작심을 제외한 모든 작심반환 /minds/except-me/{mindTypeName}
export const getMindFilter = async (mindTypeName: string): Promise<TotalMind[]> => {
  try {
    const mindTypeId: number = (() => {
      if (mindTypeName === '일상') return 2;
      if (mindTypeName === '달리기') return 3;
      if (mindTypeName === '헬스') return 4;
      if (mindTypeName === '자전거') return 5;

      return 1;
    })();
    const response = await getData<TotalMind[]>(`/minds/except-me/${mindTypeId}`, tokenValue);

    // console.log('response.data: ', response.data);
    // response.data.forEach((mind) => logText(mind));
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('선택한 작심을 불러오는 데 실패했습니다.');
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

    // console.log('response: ', response);
    // response.data.map((mind) => logText(mind));
    return response.data;
  } catch (error) {
    // console.error(error);
    throw new Error('전체 작심 인증 여부 실패함');
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
    // console.log('response: ', response);
    return response.data;
  } catch (error) {
    // console.error(error);
    throw new Error('나의 작심 리스트를 호출하는 데 실패했습니다.');
  }
};
