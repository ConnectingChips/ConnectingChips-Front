import 역도 from "../image/예시사진모음/역도.jpg";
import 달리기 from "../image/예시사진모음/달리기.jpg";
import { GroupInfoType } from "../Type/MissionType";

import { co_fit_ootd_main, co_fit_ootd_group, co_fit_ootd_list, co_fit_ootd_intro } from "./CoverBarrel";
import { co_walk_stroll_main, co_walk_stroll_list, co_walk_stroll_intro, co_walk_stroll_group } from "./CoverBarrel";
import { co_bike_work_main, co_bike_work_list, co_bike_work_intro, co_bike_work_group } from "./CoverBarrel";
import { co_fit_enter_main, co_fit_enter_list, co_fit_enter_intro, co_fit_enter_group } from "./CoverBarrel";
import { co_walk_bus_list, co_walk_bus_intro, co_walk_bus_group } from "./CoverBarrel";

/** 2023-08-23 groupList.ts - 전체 그룹 리스트  */
const groupListData: GroupInfoType[] = [
  {
    group_id: 44123,
    tab: "걷기",
    title: "점심엔 산책 어때요?",
    intro: "점심 먹고 소화시킬 겸 산책 나가요!\n목표 : 점심 시간 짬내서 걷기",
    rule: "1.산책로 사진 찍기\n2.산책하는 신발 사진 찍기",
    defaultImage: {
      defaultImage_id: 0,
      main_url: co_walk_stroll_main,
      list_url: co_walk_stroll_list,
      intro_url: co_walk_stroll_intro,
      group_url: co_walk_stroll_group,
    },
    memberList: [
      {
        member_id: "aa11",
        day: 6,
        count: 3,
        done: true,
      },
      {
        member_id: "aa222",
        day: 2,
        count: 2,
        done: false,
      },
    ],
    posts: [
      {
        post_id: 0,
        title: "인증 이름1",

        image: {
          image_id: 0,
          url: co_bike_work_main,
          path: "/wwjkrn131",
        },
      },
      {
        post_id: 1,
        title: "인증 이름2",

        image: {
          image_id: 0,
          url: 역도,
          path: "/wwjkrn131",
        },
      },
    ],
  },
  {
    group_id: 17850,
    tab: "헬스",
    title: "헬스 OOTD",
    intro: "이렇게 입으면 중량 더 칠 수 있그등요\n목표 : 기왕 운동복 입은 거 헬스장까지 가버리기",
    rule: "오늘 입은 착장 찍어 올리기\n(얼굴 노출 자유)",
    defaultImage: {
      defaultImage_id: 0,
      main_url: co_fit_ootd_main,
      list_url: co_fit_ootd_list,
      intro_url: co_fit_ootd_intro,
      group_url: co_fit_ootd_group,
    },
    memberList: [
      {
        member_id: "aa11",
        day: 2,
        count: 2,
        done: false,
      },
      {
        member_id: "aa222",
        day: 2,
        count: 2,
        done: true,
      },
    ],
    posts: [
      {
        post_id: 0,
        title: "인증 이름3",

        image: {
          image_id: 0,
          url: co_fit_ootd_main,
          path: "/wwjkrn131",
        },
      },
      {
        post_id: 1,
        title: "인증 이름4",

        image: {
          image_id: 0,
          url: 달리기,
          path: "/wwjkrn131",
        },
      },
    ],
  },
  {
    group_id: 785125,
    tab: "자전거",
    title: "나의 자출 도전기",
    intro: "자전거로 출근하는 당신은 정말 대단한 사람..\n목표 : 자전거로 출/퇴근하기",
    rule: "(택 1)\n1.자전거 탄 사진 찍기\n2.자전거 기록 앱 캡쳐하기 (따릉이앱, 스트라바 등)",
    defaultImage: {
      defaultImage_id: 0,
      main_url: co_bike_work_main,
      list_url: co_bike_work_list,
      intro_url: co_bike_work_intro,
      group_url: co_bike_work_group,
    },
    memberList: [
      {
        member_id: "aa11",
        day: 2,
        count: 2,
        done: true,
      },
      {
        member_id: "aa222",
        day: 2,
        count: 2,
        done: true,
      },
    ],
    posts: [
      {
        post_id: 0,
        title: "인증 이름3",

        image: {
          image_id: 0,
          url: co_fit_enter_main,
          path: "/wwjkrn131",
        },
      },
      {
        post_id: 1,
        title: "인증 이름4",

        image: {
          image_id: 0,
          url: 달리기,
          path: "/wwjkrn131",
        },
      },
    ],
  },
  {
    group_id: 858415,
    tab: "헬스",
    title: "헬스장 입구 인증샷📷 ",
    intro: "운동 안 해도 돼! 일단 입구까지만이라도 가보자구요\n목표 : 헬스장 입구까지 가기",
    rule: "헬스장 입구 사진 찍어 올리기",
    defaultImage: {
      defaultImage_id: 0,
      list_url: co_fit_enter_list,
      intro_url: co_fit_enter_intro,
      group_url: co_fit_enter_group,
    },
    memberList: [],
    posts: [],
  },
  {
    group_id: 4785125,
    tab: "걷기",
    title: "1 정거장 일찍 내리기",
    intro: "출퇴근길에 한 정거장만 일찍 내려서 걸어봐요 :)\n목표 : 1정거장 만이라도 걸어보기",
    rule: "(택 1)\n1.출퇴근길 신발사진 찍기\n2.개인정보 유출되지 않는 선에서 인증샷 찍기 (예: 버스정류장 벤치)",
    defaultImage: {
      defaultImage_id: 0,
      list_url: co_walk_bus_list,
      intro_url: co_walk_bus_intro,
      group_url: co_walk_bus_group,
    },
    memberList: [
      {
        member_id: "aa222",
        day: 2,
        count: 2,
        done: false,
      },
    ],
    posts: [
      {
        post_id: 0,
        title: "인증 이름1",

        image: {
          image_id: 0,
          url: 역도,
          path: "/wwjkrn131",
        },
      },
      {
        post_id: 1,
        title: "인증 이름2",

        image: {
          image_id: 0,
          url: 역도,
          path: "/wwjkrn131",
        },
      },
    ],
  },
  {
    group_id: 534524,
    tab: "자전거",
    title: "따릉이로 탄소 절감!",
    intro: "작지만 확실한 탄소 절감 행동, 따릉이! 함께 해보시겠어요?\n목표 : 따릉이를 통해 탄소절감 실천하기",
    rule: "따릉이(앱) -> 내정보 -> 이용내역 캡처하기",
    defaultImage: {
      defaultImage_id: 0,
      main_url: co_bike_work_main,
      list_url: co_bike_work_list,
      intro_url: co_bike_work_intro,
      group_url: co_bike_work_group,
    },
    memberList: [],
    posts: [],
  },
];

export default groupListData;
