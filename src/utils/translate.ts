import axios from 'axios';

import Sign from '../types/sign';
import Languages from '../types/languages';

export const isLetter = (symbol: string, language: Languages) => {
  if (language === Languages.EN) {
    return 'abcdefghijklmnopqrstuvwxyz'.includes(symbol?.toLowerCase());
  }

  return 'абвгґдеєжзиіїйклмнопрстуфхцчшщьюя'.includes(symbol?.toLowerCase());
}

export const getSignByValue = async (value: string, language: Languages) =>
  await axios.post('/api/signs', { language, filters: { value } });

export const translateText = async (text: string, language: Languages): Promise<Sign[]> => {
  const splittedText = Array.from(text);

  const signsPromises = splittedText.map(s => {
    if (!isLetter(s, language)) {
      return Promise.resolve(s);
    }

    return getSignByValue(s.toLowerCase(), language).then(({ data }) => data);
  })

  const signs: Sign[] = await Promise.all(signsPromises);

  return signs;
};