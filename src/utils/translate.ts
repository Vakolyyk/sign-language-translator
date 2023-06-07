import axios from 'axios';

import Sign from '../types/sign';

export const isLetter = (symbol: string) => 'abcdefghijklmnopqrstuvwxyz'.includes(symbol.toLowerCase());

export const getSignByValue = async (value: string) =>
  await axios.post('/api/signs', { value });

export const translateText = async (text: string): Promise<Sign[]> => {
  const splittedText = Array.from(text);

  const signsPromises = splittedText.map(s => {
    if (!isLetter(s)) {
      return Promise.resolve(s);
    }

    return getSignByValue(s.toLowerCase()).then(({ data }) => data);
  })

  const signs: Sign[] = await Promise.all(signsPromises);

  return signs;
};