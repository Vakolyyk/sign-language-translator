import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

import { useMutation } from 'react-query';
import { ChangeEvent, useCallback, useState } from 'react';
import Image from 'next/image';

import { isLetter, translateText } from '../utils/translate';
import Sign from '../types/sign';
import Loader from './common/Loader';

const SignTranslator = () => {
  const [value, setValue] = useState('');
  const [translatedText, setTranslatedText] = useState('');

  const {
    data: translation,
    mutateAsync: translate,
    isLoading: isTranslating
  } = useMutation<Sign[], unknown, string>(
    'translation',
    () => translateText(value),
    {
      onSuccess: () => {
        setTranslatedText(value);
      }
    }
  );
  
  const handleChangeValue = useCallback((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(event.target.value);
  }, []);

  const onTranslate = useCallback(() => {
    translate(value);
  }, []);

  return (
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 2.5,
      }}
    >
      <Box
        sx={{
          height: 'max-content',
        }}
      >
        <Typography
          fontSize={24}
          fontFamily="Eczar"
          fontWeight={400}
        >
          Enter your text below:
        </Typography>
        <TextField
          placeholder="Type in here..."
          value={value}
          onChange={handleChangeValue}
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
        onClick={onTranslate}
        disabled={!value}
        sx={{
          height: 'max-content',
        }}
      >
        Translate
      </Button>
      <Box>
        {translation ? (
          <>
            <Typography
              fontSize={24}
              fontFamily="Eczar"
              fontWeight={400}
            >
              Translation:
            </Typography>
            <Box fontSize={50} lineHeight="50px">
              {translation.map((s, i) => isLetter(translatedText[i]) ? (
                <Image src={s.link} alt={`Sing ${s.value}`} width={50} height={50}/>
              ) : (
                <span>{s as unknown as string}</span>
              ))}
            </Box>
          </>
        ) : (
          <Typography
            fontFamily="Eczar"
            fontSize={24}
            textAlign="center"
          >
            {isTranslating ? 'Translating... 🤫' : 'Here will be your translation 😉'}
          </Typography>
        )}
      </Box>
      <Loader open={isTranslating} />
    </Box>
  )
};

export default SignTranslator;