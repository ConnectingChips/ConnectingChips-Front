import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CTAContainer } from '../../Component/CTA/CTAContainer';
import { GroupIntroHeader } from '../../Component/Mission/GroupHeader';
import scrollTop from '../../Hooks/scrollTop';
import { getMind_IntroImage } from '../../API/Mind';
import { GNB } from '../../AppBarral';

import {
  HeadLine,
  MissionRule,
  GroupArticleS,
  IntroduceS,
} from '../../Component/Mission/GroupArticle';
import { MindIntroInfo, MindsType } from '../../Type/Mind';
import { initMind } from '../../Component/Mission/GroupArticle';
import { getMindInfo_Intro } from '../../API/Mind';

export { styled, useEffect, useState, useParams };
export { CTAContainer, GroupIntroHeader, scrollTop, getMind_IntroImage };
export { HeadLine, MissionRule, GroupArticleS, IntroduceS, initMind, getMindInfo_Intro };
export type { MindIntroInfo, MindsType };
