import { NextApiRequest, NextApiResponse } from 'next';

import SignsENCollection from '../../../database/collections/signs_en';
import SignsUACollection from '../../../database/collections/signs_ua';
import Languages from '../../../types/languages';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { language, filters } = req.body;

  if (req.method === 'POST') {
    try {
      const signsCollection = await (language === Languages.EN ? SignsENCollection : SignsUACollection);
      
      const sign = await signsCollection?.find(filters).toArray();


      return res.status(200).json(sign?.[0]);
    } catch (e) {
      return res.status(500).json(e);
    }
  }

  res
    .status(405)
    .json({ error: { name: 'NotAllowed', message: 'Method Not Allowed' } });
};

export default handler;
