import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import co_bike from '../../../image/커버 이미지/co_bike_work/co_bike_work_main.jpg'
import co_fit from '../../../image/커버 이미지/co_fit_enter/co_fit_enter_main.jpg'
import co_walk from '../../../image/커버 이미지/co_walk_stroll/co_walk_stroll_main.jpg'
import ArrowLeft from "../../../image/Icon/Arrow/Arrow_icon_W.svg";
import Arrow_Right from "../../../image/Icon/Arrow/Arrow_icon_Right_W.png";

import { MissionSingleWide } from "../../../Component/Mission/MissionTab";
import { myGroupImages } from "../../../data/myInfo";
import { myInfo, myGroupList } from '../../../data/myInfo'
import chip_Active from "../../../image/Home/chip_Active.png";
import chip_NoneActive from "../../../image/Home/chip_NoneActive.png";
import ChipList from "./ChipList";

export { styled, Link, useEffect, useRef, useState };
export { co_bike, co_fit, co_walk };
export { ArrowLeft, Arrow_Right };
export { MissionSingleWide, myGroupImages, myInfo, myGroupList, ChipList };
export { chip_Active, chip_NoneActive };
