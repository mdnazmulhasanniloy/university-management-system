import { Request, Response } from 'express';
import CatchAsync from '../../../shared/catchAsync';
import ApiError from '../../../errors/api.errors';
import { AcademicFacultyService } from './academicFaculty.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { academicFacultyFilterableFields } from './academicFaculty.constant';
import { paginationFields } from '../../../constants/pagination';
import { IAcademicFaculty } from './academicFaculty.interface';

//create faculty
const createFaculty = CatchAsync(async (req: Request, res: Response) => {
  const faculty = req?.body;
  const result = await AcademicFacultyService.createFaculty(faculty);
  if (!result) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'academic faculty creation failed',
    );
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic faculty created successfully!',
    data: result,
  });
});

//get all faculty
const getAllFaculties = CatchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicFacultyFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await AcademicFacultyService?.getAllFaculties(
    filters,
    paginationOptions,
  );

  if (!result) {
    throw new ApiError(400, 'semester not found!');
  }

  sendResponse<IAcademicFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'semester retrieved successfully!',
    meta: result.meta,
    data: result.data,
  });
});

//get faculty by id
const getFacultyById = CatchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicFacultyService.getFacultyById(id);

  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'academic faculty not found!');
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic faculty retrieved successfully!',
    data: result,
  });
});

// update faculty
const updateFaculty = CatchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await AcademicFacultyService.updateFaculty(id, updatedData);
  if (!result) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'academic faculty update failed',
    );
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic faculty updated successfully!',
    data: result,
  });
});

// delete faculty
const deleteFaculty = CatchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicFacultyService.deleteFaculty(id);
  if (!result) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'academic faculty delete failed',
    );
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic faculty deleted successfully!',
    data: result,
  });
});
export const AcademicFacultyController = {
  createFaculty,
  getAllFaculties,
  getFacultyById,
  updateFaculty,
  deleteFaculty,
};
