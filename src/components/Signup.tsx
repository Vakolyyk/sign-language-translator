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

import { emailValidator, formHasErrors } from '../utils/form';
import { Signup } from '../types/auth';
import { useAuth } from '../context/auth-context';

const Signup: React.FC = () => {
  const { isSignupProcessing, onSignup } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Signup>();

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

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
        <form onSubmit={handleSubmit(onSignup)}>
          <TextField
            {...register('firstName', { required: 'Please, input your first name' })}
            id="first name"
            label="first name"
            variant="filled"
            color="primary"
            fullWidth
            error={Boolean(errors.firstName)}
            helperText={errors.firstName?.message}
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
            loading={isSignupProcessing}
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