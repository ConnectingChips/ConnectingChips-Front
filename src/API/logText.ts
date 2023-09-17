import { GetUser, User } from '../Type/User';
import { Mind, isDoneSingle, isDone, Mylist } from '../Type/userMind';
type LoggableObject = GetUser | User | Mind | isDone | isDoneSingle | Mylist;

function logText(arg: LoggableObject) {
  for (const [key, value] of Object.entries(arg)) {
    console.log(`${key}: ${value}`);
  }
}

export default logText;
