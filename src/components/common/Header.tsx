

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Image from 'next/image';

import { useAuth } from '../../context/auth-context';
import logo from '../../../public/logo.svg';
import Menu from '../Menu';

const Header: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <Container
      maxWidth="lg"
      sx={{
        py: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
        }}
      >
        <Image src={logo} alt="Sign language translator" width={80} />
        <Typography
          fontSize={32}
          textTransform="uppercase"
          fontFamily="Eczar"
          fontWeight={700}
        >
          Sign language translator
        </Typography>
      </Box>
      {user && <Menu />}
    </Container>
  );
};

export default Header;