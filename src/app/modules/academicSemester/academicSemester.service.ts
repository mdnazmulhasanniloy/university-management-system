import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import {
  IAcademicSemester,
  IAcademicSemesterFilter,
  IPaginationOption,
} from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.models';
import { academicSemesterSearchableFields } from './academicSemesterConstant';

const createSemester = async (
  data: IAcademicSemester,
): Promise<IAcademicSemester | null> => {
  const createdUser = await AcademicSemester.create(data);
  return createdUser;
};

const getAllSemesters = async (
  filters: IAcademicSemesterFilter,
  paginationOptions: IPaginationOption,
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  //searching
  const { searchTerm, ...filtersData } = filters;

  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      $or: academicSemesterSearchableFields.map(field => ({
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
  const result = await AcademicSemester.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await AcademicSemester.countDocuments();
  return {
    meta: { page: page, limit: limit, total: total },
    data: result,
  };
};
export const AcademicSemesterService = { createSemester, getAllSemesters };
