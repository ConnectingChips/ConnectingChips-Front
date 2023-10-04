import { BoardsType } from '../../API/Boards';
import { GetUser } from '../Home/HomeBarrel';

export interface PostProps {
  postData: BoardsType;
  userInfo: GetUser;
}
