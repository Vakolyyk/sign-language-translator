import type { NextPage } from 'next';
import { Suspense } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';

import appConfig from '../configs/app.config';
import Loader from '../components/common/Loader';

const Login = dynamic(
  () => import('../components/Login')
);

const LoginPage: NextPage = () => (
  <>
    <Head>
      <title>{appConfig.title}</title>
    </Head>
    <Suspense fallback={<Loader open />}>
      <Login />
    </Suspense>
  </>
);

export default dynamic(() => Promise.resolve(LoginPage), {
  ssr: false,
});
