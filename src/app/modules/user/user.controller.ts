import { Request, Response } from 'express'
import userService from './user.service'

const createUser = async (req: Request, res: Response) => {
  try {
    const user = req.body
    const result = await userService?.createUser(user)
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
    res.status(400).send({
      success: false,
      data: error,
      message: 'user creation failed',
    })
    // console.error(error)
  }
}

export default { createUser }
