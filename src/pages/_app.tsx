import '../styles/font.css';

import CssBaseline from '@mui/material/CssBaseline'

import { QueryClient, QueryClientProvider } from 'react-query';
import type { AppProps } from 'next/app'
import Head from 'next/head'

import { SnackBarProvider } from '../context/snackbar-context';
import { AuthProvider, ProtectRoute } from '../context/auth-context';
import Layout from '../components/common/Layout'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
      refetchOnWindowFocus: false,
      retry: 2,
    },
  },
});

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <SnackBarProvider>
        <AuthProvider>
          <ProtectRoute>
            <>
              <CssBaseline />
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </>
          </ProtectRoute>
        </AuthProvider>
      </SnackBarProvider>
    </QueryClientProvider>
  )
}

export default App;