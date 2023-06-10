import { NextApiRequest, NextApiResponse } from 'next';

import { Sign } from '../../../database/models/Sign.model';
import dbConnect from '../../../database/mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const language = req.query.language;

  await dbConnect();

  if (req.method === 'GET') {
    try {
      const signs = await Sign.find({ language });

      return res.status(200).json(signs);
    } catch (e) {
      console.error(e);
      return res.status(500).json(e);
    }
  }

  res
    .status(405)
    .json({ error: { name: 'NotAllowed', message: 'Method Not Allowed' } });
};

export default handler;
