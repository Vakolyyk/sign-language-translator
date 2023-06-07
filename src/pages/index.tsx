import type { NextPage } from 'next';
import { GetServerSideProps } from 'next'
import { Suspense } from 'react';
import dynamic from 'next/dynamic';

import Head from 'next/head';
import appConfig from '../configs/app.config';
import Loader from '../components/common/Loader';
import clientPromise from '../database/mongodb'


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

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    await clientPromise;

    return {
      props: { isConnected: true },
    }
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    }
  }
}

export default dynamic(() => Promise.resolve(SignTranslatorPage), {
  ssr: false,
});
