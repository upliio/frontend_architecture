import {UserEntity} from '@upli/shared';
import {axiosInstance, GLOBAL_CONFIG} from '../index';
import {appendConfig, GLOBAL_CONFIG_FILE} from '../ConfigManager';
import {GlobalConfigDto} from '../dtos/GlobalConfigDto';
import chalk from 'chalk';

const ora = require('ora');


export let user: UserEntity;

export let token: string;

export const setToken = (newToken: string) => token = newToken;

export const getToken = () => {
  if (token)
    return token;
  if (GLOBAL_CONFIG?.token)
    return GLOBAL_CONFIG.token;
};

export const isLoggedIn = () => getToken() != null;

export const displayLoginError = () => {
  console.log(chalk.red(`Please login first with ${chalk.bold('upli login')}`));
};

export const setCurrentUser = (setUser: UserEntity) => user = setUser;

export const getCurrentUser = async () => {
  try {
    if (user != null)
      return user;
    const res = await axiosInstance.get(`/api/user/self`);
    user = res.data;
    appendConfig(GLOBAL_CONFIG_FILE, {
      user: user,
      token: getToken()
    } as GlobalConfigDto);
    return user;
  } catch (ex) {
    return Promise.reject(ex);
  }
};
