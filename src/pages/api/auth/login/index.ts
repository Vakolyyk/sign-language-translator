import { NextApiRequest, NextApiResponse } from 'next';
import { compare } from 'bcryptjs';

import { User } from '../../../../database/models/User.model';
import dbConnect from '../../../../database/mongodb';
import { generateAuthToken } from '../../../../utils/auth';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  if (req.method === 'POST') {
    const reqBody = req.body;
    
    const { email, password } = reqBody;

    try {
      const normalizedEmail = email.toLowerCase().trim();
      const user = await User.findOne({ email: normalizedEmail });
  
      let isAuthenticated = false;
      // Verify password
      try {
        if (user) {
          isAuthenticated = await compare(password, user.password);
        }
      } catch (e) {
        isAuthenticated = false;
      }

      if (!user || !isAuthenticated) {
        return res.status(400).json('Email or password is invalid');
      }  

      return res.status(200).json(generateAuthToken(user.toObject()));
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
