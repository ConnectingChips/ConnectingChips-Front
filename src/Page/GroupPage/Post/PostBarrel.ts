import axios from 'axios';

import { styled } from 'styled-components';
import { useCallback, useRef, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import PostHeader from '../PostHeader';
import PostContent from './PostContent';
import { getBoards } from '../../../API/Boards';
import { initUser } from '../../../data/initialData';
import { PostProps } from '../PostPropsType';
import { GetUser } from '../../../Type/User';
import { getUser } from '../../../API/Users';

import { BoardsType } from '../../../API/Boards';
import { INVALID_TOKEN, EXPIRED_TOKEN } from '../../../constant/error';

import Comment from '../Comment/Comment';
import GroupPost from '../Post/GroupPost';
import { refreshState } from '../../../data/initialData';

export {
  axios,
  styled,
  useState,
  useEffect,
  useParams,
  useNavigate,
  useRecoilState,
  useCallback,
  useRef,
};
export { PostHeader, PostContent, getBoards, initUser, getUser, Comment, GroupPost, refreshState };
export { INVALID_TOKEN, EXPIRED_TOKEN };
export type { PostProps, GetUser, BoardsType };
