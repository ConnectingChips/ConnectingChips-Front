import { PostInfo } from "../Type/PostInfo";
import 자전거운동 from "../image/예시사진모음/자전거운동.jpg";
import 기본프로필 from "../image/예시사진모음/default_profile.svg";

const postInfoData: PostInfo = {
  nickName: "커넥팅칩스",
  postText: "오늘도 2일째 운동 조지고 왔습니다!!!\n작심삼일도 꾸준히 하면 계속 할 수 있다",
  image: [{ image_id: 0, url: 자전거운동 }],
  likedBy: [
    { id: 0, username: "칩스1234" },
    { id: 1, username: "칩스1234" },
    { id: 2, username: "칩스1234" },
    { id: 3, username: "4567칩스" },
  ],
  commentList: [
    {
      commnet_id: 0,
      username: "칩스1234",
      text: "대박대박 대단합니다!!! 저도 칩스님처럼 작심삼칩 열심히 해야겠어요ㅜㅜ",
      profileUrl: 기본프로필,
      reply: [
        {
          reply_id: 0,
          username: "커넥팅칩스",
          text: "ㅎㅎㅎㅎ 감사합니다~! 칩스님도 득근한 하루 보내세요! :-)",
          profileUrl: 기본프로필,
        },
        {
          reply_id: 1,
          username: "커넥팅스윙스",
          text: "1234님도 화이팅입니다!",
          profileUrl: 기본프로필,
        },
      ],
    },
    {
      commnet_id: 1,
      username: "4567칩스",
      text: "엄청난 노고에 박수를!",
      profileUrl: 기본프로필,
      reply: [],
    },
  ],
};

export default postInfoData;
