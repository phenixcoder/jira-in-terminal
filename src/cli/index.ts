#!/usr/bin/env node

import { log } from '../lib/commands/log';
import { login } from '../lib/commands/login';

const { stories } = require('../lib/commands/stories');

const command = process.argv[2];
const commandArgs = process.argv.slice(3);

switch (command) {
  case 'stories':
    let [storiesAction, storiesticket] = commandArgs;
    stories(storiesAction, storiesticket);
    break;
  case 'log':
    let [logTicket, logDuration, logMessage] = commandArgs;
    log(logTicket, logDuration, logMessage);
    break;
  case 'login':
    login();
    break;

  default:
    console.log('Welcome to jit');
    break;
}
