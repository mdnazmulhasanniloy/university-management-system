import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import ErrorHandler from './middlewares/globalErrorHandler';
import routes from './app/routs';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//application routers
app.use('/api/v1/', routes);

app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send(`simple UMS server is running`);
  } catch (error) {
    next(error);
  }
});

//test
app.get('/test', async (req: Request, res: Response, next: NextFunction) => {
  // console.log(x)
  try {
    res.send(`simple UMS server testing`);
  } catch (error) {
    next(error);
  }
});

// rout not defiant
app.all('*', (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Can not find ${req.originalUrl} on the server`);

  next(err);
});

//middlewares
app.use(ErrorHandler);

export default app;
