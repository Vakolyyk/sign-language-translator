import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Link from 'next/link';

import { emailValidator } from '../utils/auth';

const Signup: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  const submitForm = () => ({});

  const email = watch('email');
  const password = watch('password');

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
            id="name"
            label="name"
            variant="filled"
            color="primary"
            fullWidth
            {...register('name')}
            sx={{ mb: 3 }}
          />
          
          <TextField
            id="lastname"
            label="lastname"
            variant="filled"
            color="primary"
            fullWidth
            {...register('lastname')}
            sx={{ mb: 3 }}
          />

          <TextField
            id="email"
            label="email"
            variant="filled"
            color="primary"
            fullWidth
            {...register('email', emailValidator())}
            sx={{ mb: 3 }}
          />

          <TextField
            type={showPassword ? 'text' : 'password'}
            id="password"
            label="password"
            variant="filled"
            color="primary"
            fullWidth
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
            {...register('password', {
              required: true,
            })}
          />

          <TextField
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
            {...register('repeatPassword', {
              required: true,
            })}
          />

          <LoadingButton
            variant="contained"
            color="primary"
            type="submit"
            disabled={!email || !password}
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