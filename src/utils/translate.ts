import axios from 'axios';

import Sign from '../types/sign';
import Languages from '../types/languages';

export const isLetter = (symbol: string, language: Languages) => {
  if (language === Languages.EN) {
    return /^[A-Za-z]$/.test(symbol);
  }

  return /^[А-ЩЬЮЯЄІҐа-щьюяєіґ']$/.test(symbol);
}

export const findSign = async (data: Record<string, string>) =>
  await axios.post('/api/sign', data);

export const translateText = async (text: string, language: Languages): Promise<Sign[]> => {
  const splittedText = Array.from(text);

  const signsPromises = splittedText.map(s => {
    if (!isLetter(s, language)) {
      return Promise.resolve(s);
    }

    const signData = {
      value: s.toLowerCase(),
      language,
    };

    return findSign(signData).then(({ data }) => data);
  })

  const signs: Sign[] = await Promise.all(signsPromises);

  return signs;
};