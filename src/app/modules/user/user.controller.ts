// import { NextFunction, RequestHandler } from 'express-serve-static-core'
import { UserService } from './user.service'
import { NextFunction, Request, Response } from 'express'

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req?.body
    const result = await UserService.createUser(user)
    res.status(200).json({
      success: true,
      message: 'user created successfully!',
      data: result,
    })
  } catch (error) {
    next(error)
  }
}

export const UserController = {
  createUser,
}

//  try {
//    //request validation
//    //body --> object
//    //data --> object

//    const createUserZodSchema = z.object({
//      body: z.object({
//        role: z.string({ required_error: 'role is required' }),
//        password: z.string().optional(),
//      }),
//    })
//    await createUserZodSchema.parseAsync(req)

//

//
//  } catch (err) {
//    next(err)
//  }
// import { RequestHandler } from 'express'
// import { UserService } from './user.service'

// const createUser: RequestHandler = async (req, res, next) => {
//   try {
//     //request validation
//     //body --> object
//     //data --> object

//     // const createUserZodSchema = z.object({
//     //   body: z.object({
//     //     role: z.string({ required_error: 'role is required' }),
//     //     password: z.string().optional(),
//     //   }),
//     // })

//     // await createUserZodSchema.parseAsync(req)
//     // console.log(object)
//
//     const result = await UserService?.createUser(user)
//     if (!result) {
//       res.status(400).send({
//         success: false,
//         data: result,
//         message: 'user creation failed',
//       })
//     }
//     res.status(200).send({
//       success: true,
//       data: result,
//       message: 'user successfully created',
//     })
//   } catch (error) {
//     // console.log(error.name)
//     next(error)
//     // res.status(400).send({
//     //   success: false,
//     //   data: error,
//     //   message: 'user creation failed',
//     // })
//     // console.error(error)
//   }
// }

// export const UserController = { createUser }
