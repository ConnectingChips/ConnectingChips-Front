import { useState, useEffect } from 'react';
import { styled } from 'styled-components';
import { useNavigate } from 'react-router-dom';

import useLoginCheck from '../../Hooks/useLoginCheck';
import { GroupHeader } from '../../Component/Mission/GroupHeader';
import Comment from './Comment';
import DivideBaS from '../../Component/Mission/DivideBa';
import GroupPost from './GroupPost';
// import Mind from './Mind';
import GroupArticle from '../../Component/Mission/GroupArticle';

export {
  // Mind
  useState,
  useEffect,
  styled,
  useNavigate,
  useLoginCheck,
  GroupHeader,
  Comment,
  DivideBaS,
  GroupPost,
  GroupArticle,
};
