import axios from 'axios';
import { styled } from 'styled-components';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { GroupHeader } from '../../Component/Mission/GroupHeader';
import { DivideBaS } from '../../Component/Mission/GroupArticle';
import { refreshState } from '../../data/initialData';
import { getMindInfo_Page, getMind_PageImage } from '../../API/Mind';
import { useRecoilState } from 'recoil';
import GroupBtn from './GroupBtn';
import {
  GroupArticleS,
  HeadLine,
  IntroduceS,
  initMind,
} from '../../Component/Mission/GroupArticle';
import { MindPageInfo, MindsType } from '../../Type/Mind';

import GroupPost from './Post/GroupPost';

import { getBoards, BoardsType } from '../../API/Boards';
import { getUser } from '../../API/Users';
import { GetUser } from '../../Type/User';
import { initUser } from '../../data/initialData';
import { INVALID_TOKEN, EXPIRED_TOKEN } from '../../constant/error';
import post_Icon from '../../image/Icon/post_Icon.svg';
import post_Icon_locked from '../../image/Icon/post_Icon_locked.svg';
import { getkeepJoin } from '../../API/Mind';

import { PostProps } from './PostPropsType';

const boardsEmptyValue = {
  boardId: 0,
  userId: 0,
  nickname: '',
  content: '',
  profileImage: '',
  createDate: '',
  image: '',
  commentCount: 0,
  commentList: [],
};

export {
  axios,
  styled,
  useState,
  useEffect,
  Link,
  useLocation,
  useNavigate,
  useParams,
  GroupHeader,
  DivideBaS,
  useRecoilState,
};
export {
  getMindInfo_Page,
  getMind_PageImage,
  GroupBtn,
  GroupArticleS,
  HeadLine,
  IntroduceS,
  initMind,
  refreshState,
};
export { GroupPost, getBoards, getUser, initUser };
export type { MindPageInfo, MindsType, GetUser, BoardsType, PostProps };
export { INVALID_TOKEN, EXPIRED_TOKEN };
export { post_Icon, post_Icon_locked, getkeepJoin };
export { boardsEmptyValue };
