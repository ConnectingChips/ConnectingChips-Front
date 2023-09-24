import { getData } from './axiosConfig';
import { MindIntroInfo, isDoneSingle, isDone, Mylist, TotalMind, EndMindType } from '../Type/Mind';
import logText from './logText';
import { MindPageInfo } from '../Type/Mind';
import { getToken } from '../data/tocken';
import { getIsLogined } from './Users';

// 작심 정보 반환 (그룹 인트로 / 인증하기)
export const getMindInfo_Intro = async (mind_id: number): Promise<MindIntroInfo> => {
  try {
    const response = await getData<MindIntroInfo>(`/minds/intro/${mind_id}`);
    // logText(response.data)
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get Minds' Info Intro, Upload");
  }
};

//  작심 정보  이미지반환 (그룹 인트로)
export const getMind_IntroImage = async (mind_id: number): Promise<{ introImage: string }> => {
  try {
    const response = await getData<{ introImage: string }>(`/minds/intro/${mind_id}/image`);

    // logText(response.data)
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get Minds' Info Intro, Upload");
  }
};

export interface getMindInfoType {
  mindId: number;
  mindTypeName: string;
  name: string;
  userCount: number;
  introduce: string;
  writeFormat: string;
  pageImage: string;
  isDoneToday: boolean;
  count: number;
}

// 그룹페이지 Minds 정보
export const getMindInfo = async (mindId: number): Promise<getMindInfoType> => {
  try {
    const { tockenHeader } = getToken();
    const response = await getData<getMindInfoType>(`/minds/page/${mindId}`, tockenHeader);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('그룹페이지 Minds 정보 반환 에러');
  }
};

interface getMindInfo_ImageType {
  pageImage: string;
}

// 그룹페이지이미지 Minds 정보
export const getMindInfo_Image = async (mindId: number): Promise<getMindInfo_ImageType> => {
  try {
    const response = await getData<getMindInfo_ImageType>(`/minds/page/${mindId}/image`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('그룹페이지이미지 정보 반환 에러');
  }
};

// 모든 작심 정보 반환 (작심 그룹 리스트) /minds /minds/except-me/{mindTypeName}
export const getMindAll = async (
  isLogin: boolean,
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>,
): Promise<TotalMind[]> => {
  try {
    await getIsLogined()
      .then((isLogin: boolean) => setIsLogin(isLogin))
      .catch(async () => {
        localStorage.removeItem('access_token');
        const response = await getData<TotalMind[]>('/minds/except-me');
        return response.data;
      });

    if (isLogin) {
      const { tokenValue } = getToken();
      const response = await getData<TotalMind[]>('/minds/except-me', tokenValue);
      return response.data;
    }

    const response = await getData<TotalMind[]>('/minds/except-me');
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
    const { tokenValue } = getToken();

    const mindTypeId: number = (() => {
      if (mindTypeName === '일상') return 1;
      if (mindTypeName === '달리기') return 2;
      if (mindTypeName === '헬스') return 3;
      if (mindTypeName === '자전거') return 4;

      return 1;
    })();
    const response = await getData<TotalMind[]>(`/minds/except-me/${mindTypeId}`, tokenValue);
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('선택한 작심을 불러오는 데 실패했습니다.');
  }
};

// 나의 참여했던 작심 반환
export const getMindAFinished = async (): Promise<EndMindType[]> => {
  try {
    const { tockenHeader } = getToken();
    const response = await getData<EndMindType[]>('/minds/my-joined-mind-list', tockenHeader);

    // response.data.forEach((mind) => logText(mind));
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error('Failed to get All Minds');
  }
};

// 당일 개별 작심 인증 여부
export const getMindSingle = async (mindId: number): Promise<boolean> => {
  try {
    const { tockenHeader } = getToken();
    const response = await getData<isDoneSingle>(`/minds/keep-join/${mindId}`, tockenHeader);

    logText(response.data);
    return response.data.isDoneToday;
  } catch (error) {
    console.error(error);
    throw new Error('당일 개별 작심 인증 여부 확인을 실패하였습니다.');
  }
};

// 당일 전체 참여한 작심 인증 여부
export const getisDoneAll = async (): Promise<isDone[]> => {
  try {
    const { tockenHeader } = getToken();
    const response = await getData<isDone[]>(`/minds/today-check`, tockenHeader);
    return response.data;
  } catch (error) {
    // console.error(error);
    throw new Error('전체 작심 인증 여부 실패함');
  }
};

interface getkeepJoin {
  keepJoin: boolean;
  isDoneToday: boolean;
}

// 작심 활동 현황 (main / Page)
export const getkeepJoin = async (mindId: number): Promise<getkeepJoin> => {
  try {
    const { tockenHeader } = getToken();
    const response = await getData<getkeepJoin>(`/minds/keep-join/${mindId}`, tockenHeader);
    return response.data;
  } catch (error) {
    throw new Error('작심 활동 현황을 호출하는 데 실패했습니다.');
  }
};

// 나의 작심 현황 (나의 작심 현황)
export const getMyList = async (): Promise<Mylist[]> => {
  try {
    const { tockenHeader } = getToken();
    const response = await getData<Mylist[]>('/minds/my-list', tockenHeader);
    return response.data;
  } catch (error) {
    // console.error(error);
    throw new Error('나의 작심 리스트를 호출하는 데 실패했습니다.');
  }
};

// 나의 작심 현황 개별
export const getMyListSingle = async (mindID: number): Promise<Mylist> => {
  try {
    const { tockenHeader } = getToken();
    const response = await getData<Mylist>(`/minds/my-list/${mindID}`, tockenHeader);
    return response.data;
  } catch (error) {
    throw new Error('나의 작심 리스트를 호출하는 데 실패했습니다.');
  }
};

// 나의 참여했던 작심 반환
export const getEndList = async (): Promise<EndMindType[]> => {
  try {
    const { tockenHeader } = getToken();
    const response = await getData<EndMindType[]>('/minds/my-joined-mind-list', tockenHeader);
    return response.data;
  } catch (error) {
    throw new Error('나의 작심 리스트를 호출하는 데 실패했습니다.');
  }
};

// 글쓰기 예시 이미지 가져오기
interface ExampleImage {
  exampleImage: string;
}

export const getExampleImage = async (mindId: number): Promise<string> => {
  try {
    const response = await getData<ExampleImage>(`/minds/upload/${mindId}/image`);
    return response.data.exampleImage;
  } catch (error) {
    throw new Error('예시이미지를 가져오지 못했습니다.');
  }
};
