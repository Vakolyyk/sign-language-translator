import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

const SignTranslator = () => {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr 100px 1fr',
        gridColumnGap: 20,

      }}
    >
      <Box>
        <Typography
          fontSize={24}
          fontFamily="Eczar"
          fontWeight={400}
        >
          Enter your text below:
        </Typography>
        <TextField
          placeholder="Type in here..."
          multiline
          minRows={5}
          maxRows={10}
          sx={{
            width: '100%',
          }}
        />
      </Box>
      <Button
        variant="text"
        sx={{
          height: 'max-content',
          position: 'relative',
          top: '50%',
          transform: 'translateY(-50%)',
        }}
      >
        Translate
      </Button>
      <Box>
        <Typography
          fontFamily="Eczar"
          fontSize={24}
          textAlign="center"
          sx={{
            position: 'relative',
            top: '50%',
            transform: 'translateY(-50%)',
          }}
        >
          Here will be your translation 😉
        </Typography>
      </Box>
    </Box>
  )
};

export default SignTranslator;