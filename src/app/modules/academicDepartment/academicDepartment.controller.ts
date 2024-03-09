import { Request, Response } from 'express';
import CatchAsync from '../../../shared/catchAsync';
import { AcademicDepartmentService } from './academicDepartment.service';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { academicDepartmentFilterableFields } from './academicDepartment.constants';
import pick from '../../../shared/pick';
import { paginationFields } from '../../../constants/pagination';
import { IAcademicDepartment } from './academicDepartment.interface';

//create a department
const createDepartment = CatchAsync(async (req: Request, res: Response) => {
  const departmentData = req.body;
  const result =
    await AcademicDepartmentService.createDepartment(departmentData);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Department created successfully!',
    data: result,
  });
});

// get all department
const getAllDepartment = CatchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicDepartmentFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await AcademicDepartmentService?.getAllDepartment(
    filters,
    paginationOptions,
  );

  sendResponse<IAcademicDepartment[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic departments get successfully!',
    meta: result.meta,
    data: result.data,
  });
});

//get department by id
const getDepartmentById = CatchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicDepartmentService.getDepartmentById(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic department retrieved successfully!',
    data: result,
  });
});

// update department
const updateDepartment = CatchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;
  const result = await AcademicDepartmentService.updateDepartment(
    id,
    updatedData,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic department updated successfully!',
    data: result,
  });
});

// delete department
const deleteDepartment = CatchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await AcademicDepartmentService.deleteDepartment(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic department deleted successfully!',
    data: result,
  });
});

export const AcademicDepartmentController = {
  createDepartment,
  getAllDepartment,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
};
