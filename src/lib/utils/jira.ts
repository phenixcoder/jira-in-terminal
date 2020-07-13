import JIRAApi from 'jira-client';
import moment from 'moment';
// @TODO: Make it load from Config / Keychain
const JiraClient = new JIRAApi({
  protocol: 'https',
  host: 'xxxxx.xxxx.xxx',
  username: 'xxxxxx',
  password: 'xxxxxx',
  apiVersion: '2',
  strictSSL: false,
});
export async function GetStory(ticket: string): Promise<JIRAApi.JsonResponse> {
  return await JiraClient.findIssue(ticket);
}
export async function LogTime(
  ticket: string,
  duration: string,
  message?: string
): Promise<JIRAApi.JsonResponse> {
  const log = {
    timeSpent: duration,
    started: moment().format(),
  };
  if (message) {
    log['comment'] = {
      type: 'doc',
      version: 1,
      content: [
        {
          type: 'paragraph',
          content: [
            {
              text: message,
              type: 'text',
            },
          ],
        },
      ],
    };
  }

  return await JiraClient.addWorklog(ticket, log);
}
