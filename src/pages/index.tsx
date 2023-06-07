import type { NextPage } from 'next';
import { GetServerSideProps } from 'next'
import { Suspense } from 'react';
import Head from 'next/head';
import dynamic from 'next/dynamic';

import appConfig from '../configs/app.config';
import Loader from '../components/common/Loader';
import clientPromise from '../database/mongodb';

type ConnectionStatus = {
  isConnected: boolean
}

const SignTranslator = dynamic(
  () => import('../components/SignTranslator')
);

const SignTranslatorPage: NextPage<ConnectionStatus> = ({ isConnected }) => (
  <>
    <Head>
      <title>{appConfig.title}</title>
    </Head>
    {isConnected ? (
      <Suspense fallback={<Loader open />}>
        <SignTranslator />
      </Suspense>
    ) : (
      <div style={{ backgroundColor: 'pink' }}>Sorry we cant connect to database</div>
    )}
  </>
);

export const getServerSideProps: GetServerSideProps<ConnectionStatus> = async () => {
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
