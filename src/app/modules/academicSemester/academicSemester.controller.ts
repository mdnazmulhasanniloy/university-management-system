import { Request, Response } from 'express';
import { AcademicSemesterService } from './academicSemester.service';
import CatchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import {
  IAcademicSearchFilter,
  IAcademicSemester,
  // IAcademicSemesterFilter,
} from './academicSemester.interface';
import { academicSemesterFilterableFields } from './academicSemester.constant';

//create a semester
const semesterCreate = CatchAsync(async (req: Request, res: Response) => {
  const data = req.body;
  const result = await AcademicSemesterService?.createSemester(data);

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
    filters as IAcademicSearchFilter,
    paginationOptions,
  );

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

  sendResponse(res, {
    statusCode: httpStatus?.OK,
    success: true,
    message: 'Semester retrieved successfully!',
    data: result,
  });
});

//update semester

const updateSemester = CatchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await AcademicSemesterService.updateSemester(id, updatedData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic semester updated successfully!',
    data: result,
  });
});

//delete semester
const deleteSemester = CatchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicSemesterService.deleteSemester(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic semester deleted successfully!',
    data: result,
  });
});

export const AcademicSemesterController = {
  semesterCreate,
  getAllSemesters,
  getSemesterById,
  updateSemester,
  deleteSemester,
};
