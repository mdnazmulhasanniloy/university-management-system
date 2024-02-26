import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import {
  IAcademicSemester,
  IPaginationOption,
} from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.models';

const createSemester = async (
  data: IAcademicSemester,
): Promise<IAcademicSemester | null> => {
  const createdUser = await AcademicSemester.create(data);
  return createdUser;
};

const getAllSemesters = async (
  paginationOptions: IPaginationOption,
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(paginationOptions);
  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const result = await AcademicSemester.find()
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  console.log('object', sortConditions);

  const total = await AcademicSemester.countDocuments();
  return {
    meta: { page: page, limit: limit, total: total },
    data: result,
  };
};
export const AcademicSemesterService = { createSemester, getAllSemesters };
