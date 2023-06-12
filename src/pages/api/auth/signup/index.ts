import { NextApiRequest, NextApiResponse } from 'next';
import { hash } from 'bcryptjs';

import { User } from '../../../../database/models/User.model';
import dbConnect from '../../../../database/mongodb';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await dbConnect();

  if (req.method === 'POST') {
    const reqBody = req.body;
    
    const { email, firstName, lastName, password, repeatPassword } = reqBody;

    try {
      const normalizedEmail = email.toLowerCase().trim();
      const userByEmail = await User.findOne({ email: normalizedEmail });
  
      if (userByEmail) {
        return res.status(400).json(
          `Email address ${normalizedEmail} already registered`,
        );
      }

      if (password !== repeatPassword) {
        return res.status(400).json('Your passwords do not match');
      }

      const hashedPassword = await hash(password, 10);

      await User.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
      });

      return res.status(200).json({});
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
