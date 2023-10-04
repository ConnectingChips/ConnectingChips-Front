import { useState } from 'react';
import { styled } from 'styled-components';
import { useRecoilState } from 'recoil';

import type { PostProps } from '../PostPropsType';
import type { GetUser } from '../../../Type/User';
import type { BoardsType } from '../../../API/Boards';
import type { CommentType, ReplyType } from '../../../API/Boards';

import { CommentHeader } from './CommentHeader';
import { CommentInput } from './CommentInput';
import CommentBoxMaker from './CommentList';

import Arrow_icon_Up from '../../image/Icon/Arrow/Arrow_icon_Up.svg';
import Arrow_icon_Down from '../../image/Icon/Arrow/Arrow_icon_Down.svg';

import { postAddComment, postAddReply } from '../../../API/Comment';
import { deleteComment, deleteReply } from '../../../API/Comment';
import DeleteModal from '../../../Component/DeleteModal';

import { refreshState } from '../../../data/initialData';

export { styled, useState, useRecoilState };
export type { PostProps, BoardsType, GetUser, CommentType, ReplyType };
export { CommentHeader, CommentInput, CommentBoxMaker, DeleteModal };
export { Arrow_icon_Up, Arrow_icon_Down };
export { postAddComment, postAddReply, deleteComment, deleteReply, refreshState };
