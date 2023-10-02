import { styled } from 'styled-components';
import { useEffect, useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import MyMisson from './MyMisson';
import GroupList from './GroupList';

import scrollTop from '../../Hooks/scrollTop';

import { GetUser } from '../../Type/User';
import { Mylist,isDone } from '../../Type/Mind';
import shareKakao from '../../API/shareKakao';
import { getUser } from '../../API/Users';
import { getMyList, getisDoneAll } from '../../API/Mind';

import { MyInfoContext, MyListContext } from '../../API/Context';
import { MyInfoContextType, MyListContextType } from '../../API/Context';
import { initUser, initMyList } from '../../data/initialData';

export { styled, useEffect, useState, Link, useNavigate, useContext };
export { MyMisson, GroupList };
export type { GetUser, Mylist, MyInfoContextType, MyListContextType, isDone };
export {
  scrollTop,
  shareKakao,
  getUser,
  getMyList,
  getisDoneAll,
  MyInfoContext,
  MyListContext,
  initUser,
  initMyList,
};
