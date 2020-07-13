import { GetStory } from '../utils/jira';
import chalk from 'chalk';
import moment from 'moment';

const colorText = (background: string, color: string, text: string) => {
  let bg = `bg${background[0].toUpperCase()}${background
    .substr(1)
    .toLowerCase()}`;
  let fg = `${color}`;

  if (bg in chalk && fg in chalk) {
    return chalk[bg][fg](text);
  }

  return chalk.black.bgWhite(text);
};

const storyTemplate = (story) => {
  return `
${chalk.gray('COLA')} > ${chalk.white(story.key)} ${chalk.yellowBright(
    story.fields.summary
  )}
${chalk.dim.white(story.fields.assignee.name)} ${chalk.white(
    moment(story.fields.updated).fromNow()
  )}
${colorText(
  'gray',
  story.fields.status.statusCategory.colorName,
  ` ${story.fields.status.statusCategory.name} (${story.fields.status.name}) `
)}

${chalk.green(story.fields.description)}

Time Logged: ${story.fields.timetracking.timeSpent}/${
    story.fields.timetracking.originalEstimate
  }
`;
};
export function stories(action, ticket) {
  switch (action) {
    case 'get':
      GetStory(ticket)
        .then((story) => {
          // console.log(JSON.stringify(story.fields, null, '  '));
          console.log(storyTemplate(story));

          for (const key in story.fields) {
            if (Object.prototype.hasOwnProperty.call(story.fields, key)) {
              const fieldValue = story.fields[key];
              if (key.match(/customfield/) === null) {
                //   console.log(key, JSON.stringify(fieldValue, null, '  '));
              } else {
                // console.log(key, 'HIDE');
              }
            }
          }
        })
        .catch((reason) => {
          console.log('Error', reason);
        });
      break;

    default:
      break;
  }
}
