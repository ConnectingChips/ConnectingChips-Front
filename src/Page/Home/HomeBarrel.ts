import { styled } from 'styled-components';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import MyMisson from './MyMisson';
import GroupList from './GroupList';

import scrollTop from '../../Hooks/scrollTop';

import { GetUser } from '../../type/User';
import { Mylist, isDone } from '../../type/Mind';
import shareKakao from '../../API/shareKakao';
import { getUser } from '../../API/Users';
import { getMyList, getisDoneAll } from '../../API/Mind';

import { initUser, initMyList } from '../../data/initialData';

export { styled, useEffect, useState, Link, useNavigate };
export { MyMisson, GroupList };
export type { GetUser, Mylist, isDone };
export { scrollTop, shareKakao, getUser, getMyList, getisDoneAll, initUser, initMyList };
