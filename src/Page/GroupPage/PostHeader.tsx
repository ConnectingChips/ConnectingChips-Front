import { styled } from "styled-components";
import postInfoData from "../../data/postInfoData";
import 기본프로필 from "../../image/예시사진모음/default_profile.svg";
import point3 from "../../image/Icon/3point_icon.svg";
import { Link } from "react-router-dom";
import { useState } from "react";

/** 2023-08-22 PostHeader.tsx - 작심 인증 프로필 + 더보기 */
const PostHeader = ({ nowTime }: { nowTime: string }): JSX.Element => {
  const [year, month, day, time] = nowTime.split(".");
  const [isToggle, setIsToggle] = useState(false);

  const handlerToogleSwitch = () => {
    setIsToggle((prev) => !prev);
  };

  return (
    <PostHeaderS>
      <PostHeaderProfileS>
        <PostProfileImageS>
          <img src={기본프로필} alt="프로필 사진" />
          {/* <Link to={ 마이페이지 }/>  */}
        </PostProfileImageS>
        <div>
          <h2>{postInfoData.nickName}</h2>
          {/* <Link to={ 마이페이지 }/>  */}
          <p>{`${year}년 ${month}월 ${day}일 `}</p>
        </div>
      </PostHeaderProfileS>
      <MoreIconS onClick={handlerToogleSwitch}>
        <img src={point3} alt="point3_icon" />
        {isToggle && (
          // <ModalBGS>
            <ModalS>
              <div>수정하기</div>
              <div>삭제하기</div>
            </ModalS>
          // </ModalBGS>
        )}
      </MoreIconS>
    </PostHeaderS>
  );
};

export default PostHeader;

/** 2023-08-22 PostHeader.tsx - 그룹페이지 아티클 헤더 */
const PostHeaderS = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  /* margin: 1rem; */
  padding: 1rem;

  img {
    cursor: pointer;
  }
`;

/** 2023-08-22 PostHeader.tsx - 그룹페이지 아티클 헤더 프로필 */
const PostHeaderProfileS = styled.div`
  display: flex;
  align-items: center;

  h2 {
    margin-right: 0.5rem;
    font-size: 0.875rem;
  }

  p {
    color: var(--font-color2);
  }
`;

/** 2023-08-22 PostHeader.tsx - 그룹페이지 아티클 헤더 프로필 */
const MoreIconS = styled.div`
  height: 3rem;
  display: flex;
  align-items: center;
  cursor: pointer;

  position: relative;
`;

/*
const ModalBGS = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
`;
*/

const ModalS = styled.div`
  position: absolute;
  top: 3.31rem;
  right: 0rem;
  background-color: var(--color-bg);

  width: 8.8125rem;
  border-radius: 0.63rem;

  div {
    height: 3.5rem;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
      background-color: var(--color-main);
      cursor: pointer;
    }

    &:first-child {
      border-radius: 0.63rem 0.63rem 0 0;
    }
    &:last-child {
      border-radius: 0 0 0.63rem 0.63rem;
    }
  }
`;

/** 2023-08-22 PostHeader.tsx - 그룹페이지 아티클 인증 이미지(임시) */
const PostProfileImageS = styled.div`
  width: 3rem;
  aspect-ratio: 1/1;
  border-radius: 10rem;
  overflow: hidden;
  margin-right: 0.5rem;

  img {
    width: 3.5rem;
  }
`;
