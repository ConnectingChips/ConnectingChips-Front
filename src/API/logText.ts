import { GetUser, User } from '../Type/User';
import { isDoneSingle, isDone, Mylist } from '../Type/Mind';
type LoggableObject =
  | GetUser
  | User
  | isDone
  | isDoneSingle
  | Mylist
  | { isJoining: boolean };

function logText(arg: LoggableObject) {
  for (const [key, value] of Object.entries(arg)) {
    console.log(`${key}: ${value}`);
  }
}

export default logText;
