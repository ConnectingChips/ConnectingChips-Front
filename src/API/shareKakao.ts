const { Kakao } = window;

const shareKakao = () => {
  const realUrl = process.env.REACT_APP_BASE_URL || '';
  const linkData = {
    mobileWebUrl: realUrl,
    webUrl: realUrl,
  };

  const imageUrl =
    'https://chips-bucket-image.s3.ap-northeast-2.amazonaws.com/images/Kakao_share.png';
  const shareData = {
    title: '작심삼칩 - 직장인 운동 습관 형성 커뮤니티',
    description: '목표는 단 3일! 작심삼일을 반복해 탄탄한 습관 만들기',
    imageUrl: imageUrl,
    link: linkData,
  };

  Kakao.Share.sendDefault({
    objectType: 'feed',
    content: shareData,
    buttons: [
      {
        title: '참여하기',
        link: linkData,
      },
    ],
  });
};

export default shareKakao;
