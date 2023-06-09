import type { NextPage } from 'next';
import { Suspense } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';

import appConfig from '../configs/app.config';
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
