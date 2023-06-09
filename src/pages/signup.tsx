import type { NextPage } from 'next';
import { Suspense } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';

import appConfig from '../configs/app.config';
import Loader from '../components/common/Loader';

const Signup = dynamic(
  () => import('../components/Signup')
);

const SignupPage: NextPage = () => (
  <>
    <Head>
      <title>{appConfig.title}</title>
    </Head>
    <Suspense fallback={<Loader open />}>
      <Signup />
    </Suspense>
  </>
);

export default dynamic(() => Promise.resolve(SignupPage), {
  ssr: false,
});
