import { Request, Response } from 'express';
import { AcademicSemesterService } from './academicSemester.service';
import ApiError from '../../../errors/api.errors';
import CatchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import {
  IAcademicSemester,
  IAcademicSemesterFilter,
  // IAcademicSemesterFilter,
} from './academicSemester.interface';
import { academicSemesterFilterableFields } from './academicSemesterConstant';

const semesterCreate = CatchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await AcademicSemesterService?.createSemester(data);

  if (!result) {
    throw new ApiError(400, 'academic semester creation failed');
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic semester created successfully!',
    data: result,
  });
});

//get all semester
const getAllSemesters = CatchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicSemesterFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await AcademicSemesterService.getAllSemesters(
    filters as IAcademicSemesterFilter,
    paginationOptions,
  );

  if (!result) {
    throw new ApiError(400, 'semester not found!');
  }

  sendResponse<IAcademicSemester[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'semester retrieved successfully!',
    meta: result.meta,
    data: result.data,
  });
});

//get semester by id
const getSemesterById = CatchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicSemesterService.getSemesterById(id);
  if (!result) {
    throw new ApiError(400, 'semester not found!');
  }
  sendResponse(res, {
    statusCode: httpStatus?.OK,
    success: true,
    message: 'Semester retrieved successfully!',
    data: result,
  });
});

/*
const getAllSemesters = CatchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const paginationOptions = pick(req.query, paginationFields);

      const result =
        await AcademicSemesterService.getAllSemesters(paginationOptions);

      if (!result || !result.data) {
        throw new ApiError(404, 'Semester not found!');
      }

      sendResponse<IAcademicSemester[]>(res, {
        statusCode: httpStatus?.OK,
        success: true,
        message: 'Semester retrieved successfully!',
        data: result?.data,
        meta: result?.meta,
      });
    } catch (error) {
      next(error);
    }
  },
);

*/
export const AcademicSemesterController = {
  semesterCreate,
  getAllSemesters,
  getSemesterById,
};
