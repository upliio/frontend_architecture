import commander from 'commander';
import {axiosInstance} from '../index';
import chalk from 'chalk';
import ora from 'ora';
import {getCurrentUser, setToken} from '../services/UserService';
import {debug} from '../utils';

const prompts = require('prompts');

export const Login = commander.program.createCommand('login')
  .description('Login into upli account')
  .action(() => {
    (async () => {
      const usernameResponse = await prompts({
        type: 'text',
        name: 'username',
        message: 'Username'
      });

      let token = null;

      if (!usernameResponse.username) {
        console.log(chalk.red('Login aborted!'));
        return;
      }

      await prompts({
        type: 'password',
        name: 'password',
        message: 'Password',
        validate: async (password: string) => {
          try {
            const res = await axiosInstance.post(`/api/auth/login`, {
              username: usernameResponse.username,
              password: password
            });
            token = res.data.token;
            return true;
          } catch (ex) {
            return 'Invalid credentials';
          }
        }
      });

      if (token) {
        const spinner = ora('Fetching user details...').start();
        setToken(token);
        await getCurrentUser().then(user => {
          spinner.succeed(`Hi ${user.firstName}! You have successfully logged in`);
        }).catch(err => {
          spinner.fail(`Could not fetch user details`);
        });
      }
    })();
  });
