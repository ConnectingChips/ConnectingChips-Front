import axios from 'axios';
import { styled } from 'styled-components';
import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { GroupHeader } from '../../Component/Mission/GroupHeader';
import { DivideBaS } from '../../Component/Mission/GroupArticle';

import { getMindInfo_Page, getMind_PageImage } from '../../API/Mind';
import GroupBtn from './GroupBtn';
import {
  GroupArticleS,
  HeadLine,
  IntroduceS,
  initMind,
} from '../../Component/Mission/GroupArticle';
import { MindPageInfo, MindsType } from '../../Type/Mind';

import Comment from './Comment';
import GroupPost from './GroupPost';

import { getBoards, BoardsType } from '../../API/Boards';
import { getUser } from '../../API/Users';
import { GetUser } from '../../Type/User';
import { initUser } from '../../data/initialData';
import {
  SERVER_ERROR,
  INVALID_TOKEN,
  EXPIRED_TOKEN,
  AXIOS_NETWORK_ERROR,
} from '../../constant/error';
import post_Icon from '../../image/Icon/post_Icon.svg';
import post_Icon_locked from '../../image/Icon/post_Icon_locked.svg';
import { getkeepJoin } from '../../API/Mind';

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
};
export {
  getMindInfo_Page,
  getMind_PageImage,
  GroupBtn,
  GroupArticleS,
  HeadLine,
  IntroduceS,
  initMind,
};
export { Comment, GroupPost, getBoards, getUser, initUser };
export type { MindPageInfo, MindsType, GetUser, BoardsType };
export { INVALID_TOKEN, EXPIRED_TOKEN };
export { post_Icon, post_Icon_locked, getkeepJoin };
