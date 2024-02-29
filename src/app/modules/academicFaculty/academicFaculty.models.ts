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
