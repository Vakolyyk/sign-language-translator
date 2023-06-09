import { Visibility, VisibilityOff } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useMutation } from 'react-query';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { propOr } from 'ramda';
import Link from 'next/link';

import { emailValidator, formHasErrors } from '../utils/form';
import { AuthDataType, Login } from '../types/auth';
import { useSnackBar } from '../context/snackbar-context';
import { loginUser, setAuthCookie } from '../utils/auth';

const Login: React.FC = () => {
  const router = useRouter();
  const { showSnackBar } = useSnackBar();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>();

  const [showPassword, setShowPassword] = useState(false);

  const { isLoading, mutateAsync: login } = useMutation<AuthDataType, unknown, Login>(
    data => loginUser(data),
    {
      onSuccess: data => {
        setAuthCookie(data);
        showSnackBar('Successfully Authenticated');
        router.push('/translator');
      }
    }
  );

  const submitForm = async (values: Login) => {
    try {
      await login(values);
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
        ENTER THE SIGN TRANSLATOR
      </Typography>
      <Box maxWidth="sm">
        <form onSubmit={handleSubmit(submitForm)}>
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
            {...register('password', {
              required: 'Please, input the password',
            })}
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
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
            sx={{ mb: 3 }}
          />

          <LoadingButton
            variant="contained"
            color="primary"
            type="submit"
            loading={isLoading}
            disabled={formHasErrors(errors)}
          >
            Log in
          </LoadingButton>
        </form>
      </Box>
      <Typography fontFamily="Eczar" textAlign="start">
        Don't have an account yet?
        {' '}
        <Link href="/signup">Sign up</Link>
      </Typography>
    </Box>
  )
};

export default Login;