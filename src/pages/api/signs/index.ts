import { NextApiRequest, NextApiResponse } from 'next';
import SignsCollection from '../../../database/collections/signs_en';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const filters = req.body;

  if (req.method === 'POST') {
    try {
      const signsCollection = await SignsCollection;
      
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
