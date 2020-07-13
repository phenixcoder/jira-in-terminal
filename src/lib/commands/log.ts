import { LogTime } from '../utils/jira';

export function log(ticket, duration, message) {
  console.log('Log:', ticket, duration, message);
  LogTime(ticket, duration, message).then((response) => console.log(response));
}
