import Router from 'next/router';
import { getAuthToken } from '../utils/auth';
import { GetServerSidePropsContext } from 'next';
import Loader from '../components/common/Loader';

export const getServerSideProps = ({ res }: GetServerSidePropsContext) => {
  const token = getAuthToken();

  if (token) {
    if (res) {
      res.writeHead(302, {
        Location: '/translator',
      });
      res.end();
    } else {
      Router.push('/translator');
    }
  } else {
    if (res) {
      res.writeHead(302, {
        Location: '/login',
      });
      res.end();
    } else {
      Router.push('/login');
    }
  }

  return {
    props: {}
  };
};

export default () => <Loader open />;