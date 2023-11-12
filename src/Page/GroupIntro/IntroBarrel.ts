import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { styled } from 'styled-components';
import { getMind_IntroImage, getMindInfo_Intro } from '../../API/Mind';
import { MindIntroInfo, MindsType } from '../../Type/Mind';
import { CTAContainer } from '../../Component/CTA/CTAContainer';
import {
  HeadLine,
  MissionRule,
  GroupArticleS,
  IntroduceS,
  initMind,
} from '../../Component/Mission/GroupArticle';
import scrollTop from '../../Hooks/scrollTop';

export { styled, useEffect, useState, useParams };
export { CTAContainer, scrollTop, getMind_IntroImage };
export { HeadLine, MissionRule, GroupArticleS, IntroduceS, initMind, getMindInfo_Intro };
export type { MindIntroInfo, MindsType };
