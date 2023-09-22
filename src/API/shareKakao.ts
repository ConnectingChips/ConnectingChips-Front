const { Kakao } = window;

const shareKakao = () => {
  const realUrl = process.env.REACT_APP_BASE_URL || '';
  const linkData = {
    mobileWebUrl: realUrl,
    webUrl: realUrl,
  };

  const shareData = {
    title: '공유 테스트 제목',
    description: '공유 테스트 내용',
    imageUrl: '',
    link: linkData,
  };

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

export default shareKakao;
