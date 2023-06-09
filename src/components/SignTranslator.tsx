import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';

import { useMutation } from 'react-query';
import { ChangeEvent, useCallback, useState } from 'react';
import Image from 'next/image';

import { isLetter, translateText } from '../utils/translate';
import Sign from '../types/sign';
import Loader from './common/Loader';
import Languages from '../types/languages';

const SignTranslator = () => {
  const [value, setValue] = useState('');
  const [language, setLanguage] = useState(Languages.EN);
  const [translation, setTranslation] = useState<Sign[]>([]);
  const [translatedText, setTranslatedText] = useState('');

  const {
    mutateAsync: translate,
    isLoading: isTranslating
  } = useMutation<Sign[], unknown, string>(
    'translation',
    () => translateText(value, language),
    {
      onSuccess: (data) => {
        setTranslation(data);
        setTranslatedText(value);
      }
    }
  );
  
  const handleChangeValue = useCallback((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValue(event.target.value);
  }, []);

  const handleChangeLanguage = useCallback((event: SelectChangeEvent<Languages>) => {
    setTranslatedText('');
    setValue('');
    setTranslation([]);
    setLanguage(event.target.value as Languages);
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
        <Box
          sx={{
            mb: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Typography
            fontSize={24}
            fontFamily="Eczar"
            fontWeight={400}
          >
            Enter your text below:
          </Typography>
          <Select
            value={language}
            onChange={handleChangeLanguage}
          >
            {Object.values(Languages).map(l => (
              <MenuItem key={l} value={l}>
                {l}
              </MenuItem>
            ))}
          </Select>
        </Box>
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
        {translation.length > 0 ? (
          <>
            <Typography
              fontSize={24}
              fontFamily="Eczar"
              fontWeight={400}
            >
              Translation:
            </Typography>
            <Box fontSize={50} lineHeight="50px">
              {translation.map((s, i) => isLetter(translatedText[i], language) ? (
                <Image key={s._id + i} src={s.link} alt={`Sing ${s.value}`} width={50} height={70}/>
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