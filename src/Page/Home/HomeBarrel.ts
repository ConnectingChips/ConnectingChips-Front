import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import MyMisson from './MyMisson';
import GroupList from './GroupList';

import scrollTop from '../../Hooks/scrollTop';

// FIXME: 사라질 코드
import { myInfo, myGroupList } from '../../data/myInfo';

import { fetchMyList, fetchTotalList } from '../../API/fetchMyList';
import { initMyList, initTotalList } from '../../data/initialData';

import shareKakao from '../../API/shareKakao';

export { styled, Link, useEffect, useState, useNavigate };
export { scrollTop, fetchMyList, initMyList, fetchTotalList, initTotalList, shareKakao };
export { MyMisson, GroupList };

// FIXME: 사라질 코드
export { myInfo, myGroupList };
