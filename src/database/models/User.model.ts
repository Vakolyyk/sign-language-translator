import mongoose from 'mongoose';

export interface UserModel extends mongoose.Document {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

export const UserSchema = new mongoose.Schema({
  email: { type: String, default: '' },
  firstName: { type: String, default: '' },
  lastName: { type: String, default: '' },
  password: { type: String, default: '' },
});

export const User = mongoose.models.User || mongoose.model<UserModel>(
  'User',
  UserSchema,
  'User',
);