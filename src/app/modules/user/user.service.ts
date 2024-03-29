// import config from '../../../config/index'
// import ApiError from '../../../errors/ApiError'
// import { IUser } from './user.interface'
// import { User } from './user.model'
// import { generateUserId } from './user.utils'

import { IUser } from './user.interface';
import { generateUserId } from './user.utils';
import { User } from './user.models';
import config from '../../../config';
import ApiError from '../../../errors/api.errors';

const createUser = async (user: IUser): Promise<IUser | null> => {
  // auto generated incremental id
  const id = await generateUserId();

  user.id = id;

  // default password
  if (!user?.password) {
    user.password = config?.default_user_pass as string;
  }
  const createdUser = await User.create(user);

  if (!createdUser) {
    throw new ApiError(400, 'Failed to create');
  }
  return createdUser;
};

const getUsers = async (): Promise<IUser | null> => {
  const users = await User.find();
  return users;
};

export const UserService = {
  createUser,
  getUsers,
};
