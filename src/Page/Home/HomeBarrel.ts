import { styled } from 'styled-components';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import MyMisson from './MyMisson';
import GroupList from './GroupList';

import scrollTop from '../../Hooks/scrollTop';

// FIXME: 사라질 코드
import { myInfo, myGroupList } from '../../data/myInfo';

import { fetchMyList, fetchTotalList } from '../../Hooks/fetchMyList';
import { initMyList, initTotalList } from '../../data/initialData';

export { styled, Link, useEffect, useState };
export { scrollTop, fetchMyList, initMyList, fetchTotalList, initTotalList };
export { MyMisson, GroupList };

// FIXME: 사라질 코드
export { myInfo, myGroupList };
