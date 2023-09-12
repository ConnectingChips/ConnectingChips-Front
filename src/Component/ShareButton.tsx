import { useEffect } from 'react';
import styled from 'styled-components';

const { Kakao } = window;

const ShareButton = () => {
  const realUrl = 'http://samchips.com';

  const linkData = {
    mobileWebUrl: realUrl,
    webUrl: realUrl,
  };

  useEffect(() => {
    Kakao.cleanup();
    Kakao.init(process.env.REACT_APP_KAKAO);
  }, []);

  const shareData = {
    title: '공유 테스트 제목',
    description: '공유 테스트 내용',
    imageUrl: '',
    link: linkData,
  };

  const shareKakao = () => {
    console.log('896cdc53db17c11f70f0ba584d9520ff');

    Kakao.Share.sendDefault({
      objectType: 'feed',
      content: shareData,
      buttons: [
        {
          title: '웹으로 이동',
          link: linkData,
        },
        {
          title: '앱으로 이동',
          link: linkData,
        },
      ],
    });
  };
  return <TestButtonS onClick={() => shareKakao()}>카카오톡 공유하기</TestButtonS>;
};

export default ShareButton;

/** 2023-08-27 ButtonList.tsx - 오늘 작심 성공! 버튼 */
const TestButtonS = styled.button`
  margin-top: 1rem;
  padding: 1rem;
  
  width: var(--width-my-mission);
  border-radius: 2rem;
  background-color: var(--color-main);
  color: black;
  &:hover {
    cursor: default;
  }
`;
