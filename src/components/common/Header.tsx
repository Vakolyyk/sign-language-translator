

import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Image from 'next/image';

import logo from '../../../public/logo.svg';

const Header: React.FC = () => (
  <Container
    maxWidth="lg"
    sx={{
      py: 2,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    }}
  >
    <Typography
      fontSize={32}
      textTransform="uppercase"
      fontFamily="Eczar"
      fontWeight={700}
    >
      Sign language translator
    </Typography>
    <Image src={logo} alt="Sign language translator" width={80} />
  </Container>
);

export default Header;