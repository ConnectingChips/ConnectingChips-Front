import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Arrow_Left_B } from '../../Component/ArrowBarrel';
import 기본프로필 from '../../image/예시사진모음/default_profile_W_MyPage.png';
// import infoIcon from '../../image/Icon/icon_Info.png';
import Info_icon_B from '../../image/Icon/Info_icon_B.svg';
import ArticleTab from '../../Component/ArticleTab';
import { CurrentMind, FinishedMindList } from './MyPageMind';

// FIXME: 버려질 코드
import { myInfo, myGroupList } from '../../data/myInfo';
import ConfirmModal from '../../Component/ConfirmModal';
import scrollTop from '../../Hooks/scrollTop';
import { GetUser } from '../../Type/User';
import { getUser } from '../../API/Users';
import { Mylist } from '../../Type/userMind';
import { getMyList } from '../../API/Mind';
import { GroupInfoType } from '../../Type/MissionType';
import { initGroup } from '../../data/initialData';

export { styled, useEffect, useState };
export { Arrow_Left_B, 기본프로필, Info_icon_B };
export { ArticleTab, CurrentMind, FinishedMindList, ConfirmModal };
export { scrollTop, type GetUser, getUser, type Mylist, getMyList };
export { myInfo, myGroupList, type GroupInfoType, initGroup };
