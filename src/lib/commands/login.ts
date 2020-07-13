import chalk from 'chalk';

export function login() {
  console.log(chalk.blueBright('Authenticating JIT with your Jira'));
  console.log('');
  console.log(chalk.green('Your JIRA server address:'));
  console.log(chalk.green('Username:'));
  console.log(chalk.green('Password:'));
}
