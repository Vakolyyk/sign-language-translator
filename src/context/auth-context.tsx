import { useMutation } from 'react-query';
import React, {
  createContext,
  ReactElement,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { propOr } from 'ramda';
import { useRouter } from 'next/router';

import {
  destroyAuthToken,
  getAuthToken,
  loginUser,
  setAuthToken,
  signupUser,
} from '../utils/auth';
import { Login, Signup } from '../types/auth';
import { useSnackBar } from './snackbar-context';
import { UserModel } from '../database/models/User.model';
import Loader from '../components/common/Loader';


type AuthContextType = {
  user: UserModel | null;
  loading: boolean;
  onLogin: (values: Login) => Promise<void>;
  isLoginProcessing: boolean;
  onSignup: (values: Signup) => Promise<void>;
  isSignupProcessing: boolean;
  onLogout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

const UnauthenticatedRoutes = ['/', '/login', 'signup'];
const checkIsUnauthenticatedRoute = (r: string) =>
  UnauthenticatedRoutes.indexOf(r) !== -1;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const { showSnackBar } = useSnackBar();
  const router = useRouter();

  useEffect(() => {
    const token = getAuthToken();

    if (token) {
      const userFromToken = JSON.parse(
        String(Buffer.from(token.split('.')[1], 'base64'))
      );

      if (userFromToken) {
        setUser(userFromToken);
      }
    }

    setLoading(false);
  }, [router.pathname]);

  const {
    isLoading: isLoginProcessing,
    mutateAsync: login,
  } = useMutation<string, unknown, Login>(
    data => loginUser(data),
    {
      onSuccess: token => {
        setAuthToken(token);
        showSnackBar('Successfully Authenticated');
        router.push('/translator');
      }
    }
  );

  const {
    isLoading: isSignupProcessing,
    mutateAsync: signup,
  } = useMutation<unknown, unknown, Signup>(
    data => signupUser(data),
    {
      onSuccess: () => {
        showSnackBar('Registration successful. You will be redirected to the login page.');
        router.push('/login');
      },
    }
  );

  const onLogin = async (values: Login) => {
    try {
      await login(values);
    } catch (e) {
      const errMessage = propOr('', 'message', e);
      showSnackBar(errMessage as string, 'warning');
    }
  } 

  const onSignup = async (values: Signup) => {
    try {
      await signup(values);
    } catch (e) {
      const errMessage = propOr('', 'message', e);
      showSnackBar(errMessage as string, 'warning');
    }
  }

  const onLogout = () => {
    destroyAuthToken();
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        onLogin,
        isLoginProcessing,
        onSignup,
        isSignupProcessing,
        onLogout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return authContext;
};

export const ProtectRoute = ({ children }: { children: ReactElement }) => {
  const router = useRouter();
  const { user, loading } = useAuth();
  
  if (loading || (!user && !checkIsUnauthenticatedRoute(router.pathname))) {
    return <Loader open />; 
  }
  
  return children;
};
