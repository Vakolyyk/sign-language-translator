import { NextApiRequest, NextApiResponse } from 'next';

import { Sign } from '../../../database/models/Sign.model';
import dbConnect from '../../../database/mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const reqBody = req.body;

  await dbConnect();

  if (req.method === 'POST') {
    try {
      const sign = await Sign.findOne(reqBody);

      return res.status(200).json(sign);
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
