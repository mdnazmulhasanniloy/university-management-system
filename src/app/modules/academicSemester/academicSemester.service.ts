import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import {
  IAcademicSearchFilter,
  IAcademicSemester,
  IPaginationOption,
} from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.models';
import {
  academicSemesterSearchableFields,
  academicSemesterTitleCodeMapper,
} from './academicSemester.constant';
import ApiError from '../../../errors/api.errors';
import httpStatus from 'http-status';

//create a new semester
const createSemester = async (
  payload: IAcademicSemester,
): Promise<IAcademicSemester | null> => {
  if (academicSemesterTitleCodeMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'invalid semester code');
  }
  const createdUser = await AcademicSemester.create(payload);
  return createdUser;
};

//get all semester
const getAllSemesters = async (
  filters: IAcademicSearchFilter,
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

//get semester by id
const getSemesterById = async (
  id: string,
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findById(id);
  return result;
};

//update semester
const updateSemester = async (
  id: string,
  payload: Partial<IAcademicSemester | null>,
): Promise<IAcademicSemester | null> => {
  if (
    payload?.title &&
    payload?.code &&
    academicSemesterTitleCodeMapper[payload.title] !== payload.code
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'invalid semester code');
  }
  const updatedUser = await AcademicSemester.findOneAndUpdate(
    { _id: id },
    payload as Partial<IAcademicSemester>,
    { new: true },
  );
  return updatedUser;
};

//delete semester

const deleteSemester = async (
  id: string,
): Promise<IAcademicSemester | null> => {
  const result = await AcademicSemester.findByIdAndDelete(id);
  return result;
};

export const AcademicSemesterService = {
  createSemester,
  getAllSemesters,
  getSemesterById,
  updateSemester,
  deleteSemester,
};
