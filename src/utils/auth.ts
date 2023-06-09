import { setCookie } from 'nookies';
import { SignOptions, sign } from 'jsonwebtoken';
import axios, { AxiosError } from 'axios';

import { Signup, Login, AuthDataType } from '../types/auth';
import { UserModel } from '../database/models/User.model';
import authConfig from '../configs/auth.config';

export const signupUser = (data: Signup) =>
  axios.post('/api/signup', data)
    .then(({ data }) => data)
    .catch(e => {
      const err = e as AxiosError<string>;
      throw new Error(err.response?.data);
    });

export const loginUser = (data: Login) =>
  axios.post('/api/login', data)
    .then(({ data }) => data)
    .catch(e => {
      const err = e as AxiosError<string>;
      throw new Error(err.response?.data);
    });
  
export const setAuthCookie = (data: AuthDataType, ctx: any = null) => {
  // set auth cookie to all domain
  if (data.token) {
    setCookie(
      ctx,
      'authDomainSSO',
      JSON.stringify({ token: data.token }),
      {
        maxAge: 30 * 24 * 60 * 60, // 1 month
        path: '/',
      },
    );
  }
};

export const generateAuthToken = (user: any, options: SignOptions = {}) =>
  sign(user, authConfig.jwtSecret, options);

export const generateResponseWithAuthData = (
  user: UserModel,
): {
  token: string;
  user: UserModel;
} => {
  const token = generateAuthToken(user);

  return { token, user };
};
