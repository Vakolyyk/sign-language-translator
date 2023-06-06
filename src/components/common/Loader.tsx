import Backdrop, { BackdropProps } from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const Loader: React.FC<BackdropProps> = ({ sx, ...rest }) => (
  <Backdrop
    sx={{
      zIndex: 10,
      height: '100vh',
      ...sx,
    }}
    {...rest}
  >
    <CircularProgress sx={{ color: '#C58FFF' }} />
  </Backdrop>
);

export default Loader;
