import { FieldErrors } from 'react-hook-form';

export const formHasErrors = (errors: FieldErrors) => Object.keys(errors).length > 0;

export const emailValidator = () => ({
  required: 'Please, input your E-mail',
  pattern: {
    value:
      /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: 'Email not valid',
  },
});