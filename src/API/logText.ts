import { GetUser, User } from '../type/User';
import { isDoneSingle, isDone, Mylist } from '../type/Mind';
type LoggableObject = GetUser | User | isDone | isDoneSingle | Mylist | { isJoining: boolean };

function logText(arg: LoggableObject) {
  for (const [key, value] of Object.entries(arg)) {
    console.log(`${key}: ${value}`);
  }
}

export default logText;
