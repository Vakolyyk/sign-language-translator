import mongoose from 'mongoose';

export interface UserModel extends mongoose.Document {
  email: string;
  name: string;
  lastName: string;
  password: string;
};

export const UserSchema = new mongoose.Schema({
  email: { type: String, default: '' },
  name: { type: String, default: '' },
  lastName: { type: String, default: '' },
  password: { type: String, default: '' },
});

export const User = mongoose.models.User || mongoose.model<UserModel>(
  'User',
  UserSchema,
  'User',
);