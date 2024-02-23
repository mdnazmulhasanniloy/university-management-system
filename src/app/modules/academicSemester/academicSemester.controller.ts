import { NextFunction, Request, Response } from 'express';
import { AcademicSemesterService } from './academicSemester.service';
import ApiError from '../../../errors/api.errors';
import CatchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';

const semesterCreate = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    const result = await AcademicSemesterService?.createSemester(data);

    if (!result) {
      throw new ApiError(400, 'academic semester creation failed');
    }
    next();

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'academic semester created successfully!',
      data: result,
    });
  },
);

export const AcademicSemesterController = {
  semesterCreate,
};
