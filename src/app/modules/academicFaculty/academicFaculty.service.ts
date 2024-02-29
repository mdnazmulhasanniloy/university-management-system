import { SortOrder } from 'mongoose';
import { paginationHelper } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import {
  IAcademicSearchFilter,
  IPaginationOption,
} from '../academicSemester/academicSemester.interface';
import { academicFacultySearchableFields } from './academicFaculty.constant';
import { IAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.models';

//create a new faculty
const createFaculty = async (
  payload: IAcademicFaculty,
): Promise<IAcademicFaculty | null> => {
  const createdUser = await AcademicFaculty.create(payload);
  return createdUser;
};

//get all faculty

const getAllFaculties = async (
  filters: IAcademicSearchFilter,
  paginationOptions: IPaginationOption,
): Promise<IGenericResponse<IAcademicFaculty[]>> => {
  //searching
  const { searchTerm, ...filtersData } = filters;

  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      $or: academicFacultySearchableFields.map(field => ({
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
  const result = await AcademicFaculty.find(whereCondition)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);
  const total = await AcademicFaculty.countDocuments();
  return {
    meta: { page: page, limit: limit, total: total },
    data: result,
  };
};

//get faculty by id

const getFacultyById = async (id: string): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findById(id);
  return result;
};

// update faculty
const updateFaculty = async (
  id: string,
  payload: IAcademicFaculty,
): Promise<IAcademicFaculty | null> => {
  const updatedUser = await AcademicFaculty.findOneAndUpdate(
    { _id: id },
    payload as Partial<IAcademicFaculty>,
    { new: true },
  );
  return updatedUser;
};

// delete Faculty

const deleteFaculty = async (id: string): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findByIdAndDelete(id);
  return result;
};

export const AcademicFacultyService = {
  createFaculty,
  getAllFaculties,
  getFacultyById,
  updateFaculty,
  deleteFaculty,
};
