import { RequestHandler } from 'express'
import { UserService } from './user.service'

const createUser: RequestHandler = async (req, res, next) => {
  try {
    const user = req.body
    const result = await UserService?.createUser(user)
    if (!result) {
      res.status(400).send({
        success: false,
        data: result,
        message: 'user creation failed',
      })
    }
    res.status(200).send({
      success: true,
      data: result,
      message: 'user successfully created',
    })
  } catch (error) {
    next(error)
    // res.status(400).send({
    //   success: false,
    //   data: error,
    //   message: 'user creation failed',
    // })
    // console.error(error)
  }
}

export const UserController = { createUser }
