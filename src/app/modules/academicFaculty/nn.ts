// constant
/*
export const academicFacultyGender = ['male', 'female', 'other'];
export const academicFacultySearchableFields = [
  'email',
  'department',
  'contactNo',
  'designation',
];
export const academicFacultyFilterableFields = [
  'email',
  'contactNo',
  'gender',
  'department',
  'faculty',
  'designation',
];

*/
//controller
/* 
import { Request, Response } from 'express';
import CatchAsync from '../../../shared/catchAsync';
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

*/

//interface
/* 
import { Model } from 'mongoose';

export type IAcademicFaculty = {
  name: {
    firstName: string;
    middleName?: string;
    lastName: string;
  };
  gender: string;
  dateOfBirth: string;
  email: string;
  contactNo: number;
  emergencyContactNo: number;
  department: string;
  faculty: string;
  designation: string;
  presentAddress: {
    road: string;
    city: string;
    state: string;
    country: string;
  };
  permanentAddress: {
    road: string;
    city: string;
    state: string;
    country: string;
  };
};

export type IAcademicFacultyModel = Model<IAcademicFaculty>;

*/

//models
/* 
import { Schema, model } from 'mongoose';
import {
  IAcademicFaculty,
  IAcademicFacultyModel,
} from './academicFaculty.interface';
import { academicFacultyGender } from './academicFaculty.constant';
import ApiError from '../../../errors/api.errors';
import httpStatus from 'http-status';

const academicFacultySchema = new Schema<IAcademicFaculty>(
  {
    name: {
      firstName: { type: String, required: true },
      middleName: { type: String, default: '' },
      lastName: { type: String, required: true },
    },
    gender: {
      type: String,
      required: true,
      enum: academicFacultyGender,
    },
    dateOfBirth: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: function (value: string) {
          // Regex for a simple email validation (customize as needed)
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        },
        message: props => `${props.value} is not a valid email address!`,
      },
    },
    contactNo: {
      type: Number,
      required: true,
    },
    emergencyContactNo: {
      type: Number,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    faculty: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    presentAddress: {
      road: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
    permanentAddress: {
      road: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      state: {
        type: String,
        required: true,
      },
      country: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  },
);

academicFacultySchema.pre('save', async function (next) {
  const isExist = await AcademicFaculty.findOne({
    email: this.email,
  });
  if (isExist) {
    throw new ApiError(
      httpStatus.CONFLICT,
      'this email is already exist in faculty',
    );
  }
  next();
});

export const AcademicFaculty = model<IAcademicFaculty, IAcademicFacultyModel>(
  'AcademicFaculty',
  academicFacultySchema,
);

*/

//route
/*
import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { academicFacultyValidation } from './academicFaculty.validation';
import { AcademicFacultyController } from './academicFaculty.controller';

const router = express.Router();

router.post(
  '/create-faculty',
  validateRequest(academicFacultyValidation.academicFacultyZodSchema),
  AcademicFacultyController?.createFaculty,
);
router.get('/:id', AcademicFacultyController?.getFacultyById);
router.patch(
  '/:id',
  validateRequest(academicFacultyValidation?.updateAcademicFacultyZodSchema),
  AcademicFacultyController?.updateFaculty,
);
router.delete('/:id', AcademicFacultyController?.deleteFaculty);
router.get('/', AcademicFacultyController?.getAllFaculties);

export const AcademicFacultyRoutes = router;

*/

//service
/*
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
import ApiError from '../../../errors/api.errors';
import httpStatus from 'http-status';

//create a new faculty
const createFaculty = async (
  payload: IAcademicFaculty,
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.create(payload);
  if (!result) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'academic faculty creation failed',
    );
  }
  return result;
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

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'academic faculty not found!');
  }

  return {
    meta: { page: page, limit: limit, total: total },
    data: result,
  };
};

//get faculty by id

const getFacultyById = async (id: string): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findById(id);
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'academic faculty not found!');
  }
  return result;
};

// update faculty
const updateFaculty = async (
  id: string,
  payload: IAcademicFaculty,
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findOneAndUpdate(
    { _id: id },
    payload as Partial<IAcademicFaculty>,
    { new: true },
  );

  if (!result) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'academic faculty update failed',
    );
  }
  return result;
};

// delete Faculty

const deleteFaculty = async (id: string): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findByIdAndDelete(id);

  if (!result) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'academic faculty delete failed',
    );
  }

  return result;
};

export const AcademicFacultyService = {
  createFaculty,
  getAllFaculties,
  getFacultyById,
  updateFaculty,
  deleteFaculty,
};
*/

//zod validation

// import { z } from 'zod';
// import { academicFacultyGender } from './academicFaculty.constant';

// const academicFacultyZodSchema = z.object({
//   body: z.object({
//     name: z.object({
//       firstName: z.string({ required_error: 'First name is required' }),
//       middleName: z.string().optional(),
//       lastName: z.string({ required_error: 'Last name is required' }),
//     }),
//     gender: z.enum([...academicFacultyGender] as [string, ...string[]], {
//       required_error: 'Gender is required',
//     }),
//     dateOfBirth: z.string({ required_error: 'Date of Birth is required' }),
//     email: z.string({ required_error: 'Email is required' }).email(),
//     contactNo: z.number({ required_error: 'Contact No is required' }),
//     emergencyContactNo: z.number({
//       required_error: 'Emergency Contact No is required',
//     }),
//     department: z.string({ required_error: 'Department is required' }),
//     faculty: z.string({ required_error: 'faculty is required' }),
//     designation: z.string({ required_error: 'Designation is required' }),
//     presentAddress: z.object({
//       road: z.string({ required_error: 'Address is required' }),
//       city: z.string({ required_error: 'City is required' }),
//       state: z.string({ required_error: 'State is required' }),
//       country: z.string({ required_error: 'country is required' }),
//     }),
//     permanentAddress: z.object({
//       road: z.string({ required_error: 'Address is required' }),
//       city: z.string({ required_error: 'City is required' }),
//       state: z.string({ required_error: 'State is required' }),
//       country: z.string({ required_error: 'country is required' }),
//     }),
//   }),
// });

// const updateAcademicFacultyZodSchema = z.object({
//   body: z.object({
//     name: z
//       .object({
//         firstName: z
//           .string({ required_error: 'First name is required' })
//           .optional(),
//         middleName: z.string().optional(),
//         lastName: z
//           .string({ required_error: 'Last name is required' })
//           .optional(),
//       })
//       .optional(),
//     gender: z
//       .enum([...academicFacultyGender] as [string, ...string[]], {
//         required_error: 'Gender is required',
//       })
//       .optional(),
//     dateOfBirth: z
//       .string({ required_error: 'Date of Birth is required' })
//       .optional(),
//     email: z.string({ required_error: 'Email is required' }).email().optional(),
//     contactNo: z
//       .number({ required_error: 'Contact No is required' })
//       .optional(),
//     emergencyContactNo: z
//       .number({
//         required_error: 'Emergency Contact No is required',
//       })
//       .optional(),
//     department: z
//       .string({ required_error: 'Department is required' })
//       .optional(),
//     faculty: z.string({ required_error: 'faculty is required' }).optional(),
//     designation: z
//       .string({ required_error: 'Designation is required' })
//       .optional(),
//     presentAddress: z
//       .object({
//         road: z.string({ required_error: 'Address is required' }).optional(),
//         city: z.string({ required_error: 'City is required' }).optional(),
//         state: z.string({ required_error: 'State is required' }).optional(),
//         country: z.string({ required_error: 'country is required' }).optional(),
//       })
//       .optional(),
//     permanentAddress: z
//       .object({
//         road: z.string({ required_error: 'Address is required' }).optional(),
//         city: z.string({ required_error: 'City is required' }).optional(),
//         state: z.string({ required_error: 'State is required' }).optional(),
//         country: z.string({ required_error: 'country is required' }).optional(),
//       })
//       .optional(),
//   }),
// });

// export const academicFacultyValidation = {
//   academicFacultyZodSchema,
//   updateAcademicFacultyZodSchema,
// };
