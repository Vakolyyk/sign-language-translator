import { styled } from '@mui/material/styles';

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Link from 'next/link';

const StyledLink = styled(Link)(() => ({
  color: '#353ee8',
  textDecoration: 'none',
  transition: '0.2s ease',

  '&:hover': {
    opacity: 0.7,
  }
}));

const Footer: React.FC = () => (
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
      <StyledLink
        href="https://www.facebook.com/profile.php?id=100008788981765"
        target="_blank"
        rel="noopener noreferrer"
      >
        <FacebookIcon sx={{ fontSize: 30 }} />
      </StyledLink>
      <StyledLink
        href="https://instagram.com/vakolyyk?igshid=MjEwN2IyYWYwYw=="
        target="_blank"
        rel="noopener noreferrer"
      >
        <InstagramIcon sx={{ fontSize: 30 }} />
      </StyledLink>
    </Box>
    <Typography fontFamily="Eczar">
      {`Copyright © ${new Date().getFullYear()}. Created by`}
      {' '}
      <StyledLink href="mailto:anton.vakolyyk@gmail.com">
        Vakolyyk
      </StyledLink>  
    </Typography>
  </Container>
);

export default Footer;