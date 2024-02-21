import { NextFunction, Request, Response, RequestHandler } from 'express'
import { AnyZodObject } from 'zod'

const validateRequest: RequestHandler =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req?.body,
        query: req?.query,
        params: req?.params,
        cookies: req?.cookies,
      })
      return next()
    } catch (error) {
      next(error)
    }
  }

export default validateRequest
