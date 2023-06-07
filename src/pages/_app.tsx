import CssBaseline from '@mui/material/CssBaseline'
import Head from 'next/head'
import type { AppProps } from 'next/app'

import Layout from '../components/common/Layout'

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <CssBaseline />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default App;