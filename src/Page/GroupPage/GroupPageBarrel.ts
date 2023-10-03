import { styled } from 'styled-components';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { GroupHeader } from '../../Component/Mission/GroupHeader';
import { DivideBaS } from '../../Component/Mission/GroupArticle';

import { GroupPostList } from './GroupPostList';
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

export { styled, useState, useEffect, useParams, GroupHeader, DivideBaS };
export {
  GroupPostList,
  getMindInfo_Page,
  getMind_PageImage,
  GroupBtn,
  GroupArticleS,
  HeadLine,
  IntroduceS,
  initMind,
};
export { Comment, GroupPost };
export type { MindPageInfo, MindsType };
