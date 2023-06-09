import { SignOptions, sign } from 'jsonwebtoken';
import axios, { AxiosError } from 'axios';
import Cookies from 'js-cookie'

import { Signup, Login } from '../types/auth';
import authConfig from '../configs/auth.config';

export const signupUser = (data: Signup) =>
  axios.post('/api/auth/signup', data)
    .then(({ data }) => data)
    .catch(e => {
      const err = e as AxiosError<string>;
      throw new Error(err.response?.data);
    });

export const loginUser = (data: Login) =>
  axios.post('/api/auth/login', data)
    .then(({ data }) => data)
    .catch(e => {
      const err = e as AxiosError<string>;
      throw new Error(err.response?.data);
    });
  
export const setAuthToken = (token: string) => {
  // set auth cookie to all domain
  if (token) {
    Cookies.set('authToken', token);
  }
};

export const destroyAuthToken = () => Cookies.remove('authToken');

export const getAuthToken = () => Cookies.get('authToken');
  
export const generateAuthToken = (user: any, options: SignOptions = {}) =>
  sign(user, authConfig.jwtSecret, options);
