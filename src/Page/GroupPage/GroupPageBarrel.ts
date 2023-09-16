import { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';

import { useFindGroup } from '../../Hooks/useFindGroup';
import useLoginCheck from '../../Hooks/useLoginCheck';
import { GroupHeader } from '../../Component/Mission/GroupHeader';
import LikeBind from '../../Type/LikeBind';
import Comment from './Comment';
import DivideBaS from '../../Component/Mission/DivideBa';
import GroupActive from './GroupActive';
// import Mind from './Mind';
import GroupArticle from '../../Component/Mission/GroupArticle';

export {
  // Mind
  useState,
  useEffect,
  styled,
  useNavigate,
  useFindGroup,
  useLoginCheck,
  GroupHeader,
  type LikeBind,
  Comment,
  DivideBaS,
  GroupActive,
  GroupArticle,
};
