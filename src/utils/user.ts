import { UserModel } from '../database/models/User.model';

export const getFullName = (user: UserModel | null) => {
  if (!user) {
    return null;
  }

  return `${user.name} ${user.lastName}`;
}