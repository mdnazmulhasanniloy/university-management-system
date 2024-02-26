// import { NextFunction, RequestHandler } from 'express-serve-static-core'
import { NextFunction, Request, Response } from 'express';
import CatchAsync from '../../../shared/catchAsync';
import { UserService } from './user.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const createUser = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = req?.body;
    const result = await UserService.createUser(user);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'user created successfully!',
      data: result,
    });

    next();
  },
);

export const UserController = {
  createUser,
};
