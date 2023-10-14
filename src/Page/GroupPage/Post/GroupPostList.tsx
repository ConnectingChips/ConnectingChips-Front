import axios from 'axios';
import { styled } from 'styled-components';
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import {
  getBoards,
  initUser,
  getUser,
  CommentList,
  refreshState,
  GroupPost,
} from './PostListBarrel';
import type { BoardsType, GetUser } from './PostListBarrel';
import { INVALID_TOKEN, EXPIRED_TOKEN } from './PostListBarrel';

const GroupPostList = () => {
  const { mindId } = useParams<string>();
  const [mindData, setMindData] = useState<BoardsType[]>([]);
  const [userInfo, setUserInfo] = useState<GetUser>(initUser);
  const navigate = useNavigate();
  const [refresh] = useRecoilState<number>(refreshState);

  useEffect(() => {
    getBoards(Number(mindId)).then((res: BoardsType[]) => {
      setMindData(res);
    });
  }, [refresh, mindId]);

  useEffect(() => {
    (async () => {
      try {
        const userData = await getUser();
        setUserInfo(userData);
      } catch (error) {
        console.error(error);
        // TODO: 코드 중복 수정 필요 / 공통으로 처리할 에러 정리 필요
        if (axios.isAxiosError(error)) {
          if (error.response?.data.code === EXPIRED_TOKEN) {
            localStorage.removeItem('access_token');
            return navigate('/');
          }

          if (error.response?.data.code === INVALID_TOKEN) {
            localStorage.removeItem('access_token');
            return navigate('/');
          }
        }
      }
    })();
  }, [navigate]);

  return (
    <GroupPostListContainerS>
      <GroupPostListS>
        <h2 className='headLine'>작심 인증글</h2>
        {mindData.length === 0 ? (
          <EmptyPost />
        ) : (
          <>
            {mindData.map((postData) => {
              const postProps = { postData, userInfo };
              return (
                <PostContainerS key={postData.boardId}>
                  <GroupPost postProps={postProps} sort='groupPage' />
                  <CommentList postProps={postProps} />
                </PostContainerS>
              );
            })}
          </>
        )}
      </GroupPostListS>
    </GroupPostListContainerS>
  );
};

const EmptyPost = () => {
  return (
    <EmptyPostS>
      <img src={`${process.env.PUBLIC_URL}/noMind.png`} alt='noMind'></img>
      <h2>등록된 인증글이 없습니다.</h2>
      <p>가장 먼저 작심을 인증해 보세요!</p>
    </EmptyPostS>
  );
};

export default GroupPostList;

const GroupPostListContainerS = styled.div`
  background-color: var(--color-bg);
`;

const GroupPostListS = styled.div`
  margin: 0 auto;
  max-width: var(--width-max);
  display: flex;
  flex-direction: column;
  padding: 1.25rem 0;
  h2.headLine {
    font-size: 1.125rem;
    margin: 0 1rem 0.5rem 1rem;
  }
`;

const PostContainerS = styled.article`
  margin-bottom: 2.5rem;
`;

const EmptyPostS = styled.div`
  height: 466px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  img {
    width: 7.5rem;
    margin-bottom: 1rem;
  }
  p {
    color: var(--font-color3);
  }
`;
