import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Arrow_Left_B } from '../../Component/ArrowBarrel';
import 기본프로필 from '../../image/예시사진모음/default_profile_W_MyPage.png';

import Info_icon_B from '../../image/Icon/Info_icon_B.svg';
import ArticleTab from '../../Component/ArticleTab';
import { CurrentMind, EndMindList } from './MyPageMind';

import ConfirmModal from '../../Component/ConfirmModal';
import scrollTop from '../../Hooks/scrollTop';
import { GetUser } from '../../type/User';
import { getMyList } from '../../API/Mind';
import { Mylist } from '../../type/Mind';
import { initUser, initMyList } from '../../data/initialData';
import { getUser, logoutUser } from '../../API/Users';
import TermsModal from './TermsModal';

export { styled, useEffect, useState, useNavigate };
export { Arrow_Left_B, 기본프로필, Info_icon_B };
export { ArticleTab, CurrentMind, EndMindList, ConfirmModal };
export { scrollTop, getUser, getMyList, logoutUser };
export { initUser, initMyList, TermsModal };
export type { GetUser, Mylist };
