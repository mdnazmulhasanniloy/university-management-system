import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import usersRouters from './app/modules/user/users.route'

const app: Application = express()

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//application routers
app.use('/api/v1/users', usersRouters)

app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send(`simple UMS server is running`)
  } catch (error) {
    next(error)
  }
})

// rout not defiant
app.all('*', (req, res, next) => {
  const err = new Error(`Can not find ${req.originalUrl} on the server`)
  // err.status = "fail";
  // err.statusCode = 404;

  next(err)
})

export default app
