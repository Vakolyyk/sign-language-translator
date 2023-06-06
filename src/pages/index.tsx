import type { NextPage } from 'next';
import dynamic from 'next/dynamic';

import Head from 'next/head';
import appConfig from '../configs/app.config';
import { Suspense } from 'react';
import Loader from '../components/common/Loader';

const SignTranslator = dynamic(
  () => import('../components/SignTranslator')
);

const SignTranslatorPage: NextPage = () => (
  <>
    <Head>
      <title>{appConfig.title}</title>
    </Head>
    <Suspense fallback={<Loader open />}>
      <SignTranslator />
    </Suspense>
  </>
);

export default dynamic(() => Promise.resolve(SignTranslatorPage), {
  ssr: false,
});
