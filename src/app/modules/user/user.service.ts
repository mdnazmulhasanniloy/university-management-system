import { User } from './user.models'
import { IUser } from './user.interface'
import config from '../../../config'
import { generateUserId } from './user.utils'
import ApiError from '../../../errors/api.errors'

const createUser = async (user: IUser): Promise<IUser | null> => {
  //auto generated incremental id
  try {
    const id = await generateUserId()
    if (id) {
      user.id = id
    }
    if (!user?.password) {
      //default password
      user.password = config?.default_user_pass as string
    }

    const createdUser = await User.create(user)
    if (!createdUser) {
      throw new ApiError(400, 'Failed to create User!')
    }
    return createdUser
  } catch (error) {
    throw new ApiError(400, 'Failed to create User!')
  }
}

export default { createUser }
