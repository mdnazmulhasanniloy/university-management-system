import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import { UserRoutes } from './app/modules/user/user.route'
import ErrorHandler from './middlewares/globalErrorHandler'

const app: Application = express()

app.use(cors())

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// console.log(app.get('env'))

//application routers
app.use('/api/v1/users', UserRoutes)

app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send(`simple UMS server is running`)
  } catch (error) {
    next(error)
  }
})

//test
// app.get('/test', async (req: Request, res: Response, next: NextFunction) => {
//   Promise.reject(new Error('unhandled promise rejection'))
//   // res.send(`unexpected error`)
// })

// rout not defiant
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Can not find ${req.originalUrl} on the server`)

  next(err)
})

//middlewares
app.use(ErrorHandler)

export default app
