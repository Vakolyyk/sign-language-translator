import mongoose from 'mongoose';

export interface SignModel extends mongoose.Document {
  value: string;
  language: string;
  link: string;
};

export const SignSchema = new mongoose.Schema({
  value: { type: String, default: '' },
  language: { type: String, default: '' },
  link: { type: String, default: '' },
});

export const Sign = mongoose.models.Sign || mongoose.model<SignModel>(
  'Sign',
  SignSchema,
  'Sign',
);