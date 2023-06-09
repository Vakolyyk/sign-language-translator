import React, { createContext, useContext } from 'react';
import Alert, { AlertColor } from '@mui/material/Alert';
import { Snackbar, Container } from '@mui/material';

type SnackBarContextActions = {
  showSnackBar: (message: string, color?: AlertColor) => void;
};

const SnackBarContext = createContext({} as SnackBarContextActions);

interface SnackBarContextProviderProps {
  children: React.ReactNode;
}

const SnackBarProvider: React.FC<SnackBarContextProviderProps> = ({
  children,
}) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string>('');
  const [alertColor, setAlertColor] = React.useState<AlertColor>('success');

  const showSnackBar = (message: string, color: AlertColor = 'success') => {
    setMessage(message);
    setAlertColor(color);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <SnackBarContext.Provider value={{ showSnackBar }}>
      <Snackbar
        open={open}
        autoHideDuration={5000}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={handleClose}
        sx={{ width: '100%' }}
      >
        <Container maxWidth="md">
          <Alert
            onClose={handleClose}
            severity={alertColor}
            sx={{
              '&.MuiAlert-filledError': {
                backgroundColor: 'secondary.main',
                color: 'darker.main',
              },
            }}
            icon={false}
            variant="filled"
          >
            {message}
          </Alert>
        </Container>
      </Snackbar>
      {children}
    </SnackBarContext.Provider>
  );
};

const useSnackBar = (): SnackBarContextActions => {
  const context = useContext(SnackBarContext);

  if (!context) {
    throw new Error('useSnackBar must be used within an SnackBarProvider');
  }

  return context;
};

export { SnackBarProvider, useSnackBar };
