import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';

import { useState } from 'react';
import { useRouter } from 'next/router';

import { useAuth } from '../context/auth-context';
import { getFullName } from '../utils/user';
import Box from '@mui/material/Box';

const Menu: React.FC = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  
  const { user, onLogout } = useAuth();

  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log(event.currentTarget);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        onClick={handleOpen}
      >
        {getFullName(user)}
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Button
            onClick={() => router.push('/translator')}
          >
            Translator
          </Button>
          <Button onClick={onLogout}>
            Log out
          </Button>
        </Box>
      </Popover>
    </>
  )
};

export default Menu;