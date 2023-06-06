import { Container } from '@mui/material';
import Box from '@mui/material/Box';

import Header from './Header';
import Footer from './Footer';

type LayoutProps = {
  children: React.ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      minHeight: '100vh',
    }}
  >
    <Header />
    <Box component="main">
      <Container maxWidth="md">{children}</Container>
    </Box>
    <Footer />
  </Box>
);

export default Layout;