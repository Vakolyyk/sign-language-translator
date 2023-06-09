import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import { AxiosError } from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';
import { propOr } from 'ramda';
import Link from 'next/link';

import { emailValidator, formHasErrors } from '../utils/form';
import { signupUser } from '../utils/auth';
import { Signup } from '../types/user';
import { useSnackBar } from '../context/snackbar-context';

const Signup: React.FC = () => {
  const router = useRouter();
  const { showSnackBar } = useSnackBar();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Signup>();

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const { isLoading, mutateAsync: signup } = useMutation<unknown, AxiosError<string>, Signup>(
    data => signupUser(data),
    {
      onSuccess: () => {
        showSnackBar('Registration successful. You will be redirected to the login page.');
        router.push('/login');
      },
    }
  );

  const submitForm = async (values: Signup) => {
    try {
      await signup(values);
    } catch (e) {
      const errMessage = propOr('', 'message', e);
      showSnackBar(errMessage as string, 'warning');
    }
  }

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3,
      }}
    >
      <Typography
        variant="h2"
        component="div"
        fontFamily="Eczar"
        textAlign="center"
      >
        REGISTRATION
      </Typography>
      <Box maxWidth="sm">
        <form onSubmit={handleSubmit(submitForm)}>
          <TextField
            {...register('name', { required: 'Please, input your name' })}
            id="name"
            label="name"
            variant="filled"
            color="primary"
            fullWidth
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
            sx={{ mb: 3 }}
          />
          
          <TextField
            {...register('lastName', { required: 'Please, input your last name' })}
            id="last name"
            label="last name"
            variant="filled"
            color="primary"
            fullWidth
            error={Boolean(errors.lastName)}
            helperText={errors.lastName?.message}
            sx={{ mb: 3 }}
          />

          <TextField
            {...register('email', emailValidator())}
            id="email"
            label="email"
            variant="filled"
            color="primary"
            fullWidth
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
            sx={{ mb: 3 }}
          />

          <TextField
            {...register('password', { required: 'Please, input the password' })}
            type={showPassword ? 'text' : 'password'}
            id="password"
            label="password"
            variant="filled"
            color="primary"
            fullWidth
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => setShowPassword(prev => !prev)}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
          />

          <TextField
            {...register('repeatPassword', {
              required: 'Please, repeat your password',
            })}
            type={showRepeatPassword ? 'text' : 'password'}
            id="repeatPassword"
            label="repeat password"
            variant="filled"
            color="primary"
            fullWidth
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle repeatPassword visibility"
                    onClick={() => setShowRepeatPassword(prev => !prev)}
                  >
                    {showRepeatPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{ mb: 3 }}
          />

          <LoadingButton
            variant="contained"
            color="primary"
            type="submit"
            loading={isLoading}
            disabled={formHasErrors(errors)}
          >
            Sign up
          </LoadingButton>
        </form>
      </Box>
      <Typography fontFamily="Eczar" textAlign="start">
        Already have an account?
        {' '}
        <Link href="/login">Log in</Link>
      </Typography>
    </Box>
  )
};

export default Signup;