import httpStatus from 'http-status';
import ApiError from '../../../errors/api.errors';
import { AcademicDepartment } from './academicDepartment.models';
import { IAcademicDepartment } from './academicDepartment.interface';
import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { academicDepartmentSearchableFields } from './academicDepartment.constants';
import { IGenericResponse } from '../../../interfaces/common';
import {
  IAcademicSearchFilter,
  IPaginationOption,
} from '../academicSemester/academicSemester.interface';

//create department
const createDepartment = (
  data: IAcademicDepartment,
): Promise<IAcademicDepartment | null> => {
  const result = AcademicDepartment.create(data);
  if (!result) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'academic department creation failed',
    );
  }

  return result;
};

// get all department
const getAllDepartment = async (
  filters: IAcademicSearchFilter,
  paginationOptions: IPaginationOption,
): Promise<IGenericResponse<IAcademicDepartment[]>> => {
  //searching
  const { searchTerm, ...filtersData } = filters;

  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      $or: academicDepartmentSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.entries(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData)?.map(([field, value]) => ({
        [field]: [value],
      })),
    });
  }

  //sorting and pagination
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
  //find collection
  const result = await AcademicDepartment.find(whereCondition)
    .populate('academicFaculty')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'department not found!');
  }

  const total = await AcademicDepartment.countDocuments();
  return {
    meta: { page: page, limit: limit, total: total },
    data: result,
  };
};
//get department by id
const getDepartmentById = async (
  id: string,
): Promise<IAcademicDepartment | null> => {
  const result =
    await AcademicDepartment.findById(id).populate('academicFaculty');

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'academic department not found!');
  }

  return result;
};

//update department
const updateDepartment = async (
  id: string,
  payload: IAcademicDepartment,
): Promise<IAcademicDepartment | null> => {
  const updatedDepartment = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload as Partial<IAcademicDepartment>,
    { new: true },
  );

  if (!updatedDepartment) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'academic faculty update failed',
    );
  }

  return updatedDepartment;
};

//delete department
const deleteDepartment = async (
  id: string,
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findByIdAndDelete(id);
  if (!result) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'academic faculty delete failed',
    );
  }

  return result;
};
export const AcademicDepartmentService = {
  createDepartment,
  getAllDepartment,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
};
