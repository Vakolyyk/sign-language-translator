import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { emailValidator } from '../utils/auth';

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);

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
        ENTER THE SIGN TRANSLATOR
      </Typography>
      <form onSubmit={handleSubmit(submitForm)}>
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

        <LoadingButton
          variant="contained"
          color="primary"
          type="submit"
          disabled={!email || !password}
        >
          Log in
        </LoadingButton>
      </form>
      <Typography fontFamily="Eczar" textAlign="start">
        Don't have an account yet? Sign up
      </Typography>
    </Box>
  )
};

export default Login;