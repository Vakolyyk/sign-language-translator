import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Button from '@mui/material/Button';

import { useMutation, useQuery } from 'react-query';
import { ChangeEvent, useCallback, useState } from 'react';
import { prop } from 'ramda';
import Image from 'next/image';

import { getSigns, isLetter, translateText } from '../utils/translate';
import { additionalSigns } from '../constants/additional-signs';
import Sign from '../types/sign';
import Loader from './common/Loader';
import Languages from '../types/languages';
import Micro from './Micro';

const SignTranslator = () => {
  const [value, setValue] = useState('');
  const [language, setLanguage] = useState(Languages.EN);
  const [translation, setTranslation] = useState<Sign[]>([]);
  const [translatedText, setTranslatedText] = useState('');

  const [typeTranslation, setTypeTranslation] = useState(true);

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

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

  const { data: dataSigns } = useQuery<Sign[]>(
    ['signs', language],
    () => getSigns(language),
    {
      enabled: !typeTranslation,
    }
  );

  const signs = [
    ...(dataSigns || []),
    ...additionalSigns
  ];
  
  const handleSwitchType = () => {
    setValue('');
    setTypeTranslation(prev => !prev);
  }
  
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
      <Button
        onClick={handleSwitchType}
      >
        Switch translation type
      </Button>
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
          <Box>
            {language === Languages.EN && typeTranslation && matches && (
              <Micro changeValue={setValue} />
            )}
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
        </Box>
        {typeTranslation ? (
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
        ) : (
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              columnGap: 2,
              rowGap: 2,
            }}
          >
            {signs?.map(s => (
              <Box
                onClick={() => setValue(prev => prev + s.value)}
                sx={{
                  minHeight: 134,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 1,
                  border: '1px solid #000',
                  cursor: 'pointer',

                  transition: '0.2s ease',

                  '&:hover': {
                    color: '#353ee8',
                    opacity: 0.7,
                  }
                }}
              >
                {s.link ? (
                  <>
                    <Image
                      key={s._id}
                      src={s.link}
                      alt={`Sign ${s.value}`}
                      width={80}
                      height={100}
                    />
                    <span>{s.value}</span>
                  </>
                ) : (
                  <Typography fontSize={25}>
                    {prop('title', s)}
                  </Typography>
                )}
              </Box>
            ))}
          </Box>
        )}
      </Box>
      {typeTranslation && (
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
      )}
      {typeTranslation ? (
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
      ) : (
        <>
          <Typography
            fontSize={24}
            fontFamily="Eczar"
            fontWeight={400}
          >
            Translation:
          </Typography>
          <Typography
            fontFamily="Eczar"
            fontSize={34}
            textAlign={value ? "start" : "center"}
          >
            {value || 'Here will be your translation 😉'}
          </Typography>
        </>
      )}
      <Loader open={isTranslating} />
    </Box>
  )
};

export default SignTranslator;