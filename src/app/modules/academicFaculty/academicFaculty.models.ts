// import { Schema, model } from 'mongoose';
// import {
//   AcademicFacultyModel,
//   IAcademicFaculty,
// } from './academicFaculty.interface';

// const AcademicFacultySchema = new Schema<
//   IAcademicFaculty,
//   AcademicFacultyModel
// >(
//   {
//     title: {
//       type: String,
//       required: true,
//       // unique: true,
//     },
//   },
//   {
//     timestamps: true,
//     toJSON: {
//       virtuals: true,
//     },
//   },
// );

// export const AcademicFaculty = model<IAcademicFaculty, AcademicFacultyModel>(
//   'AcademicFaculty',
//   AcademicFacultySchema,
// );

import { Schema, model } from 'mongoose';
import {
  IAcademicFaculty,
  IAcademicFacultyModel,
} from './academicFaculty.interface';

const academicDepartmentSchema = new Schema<IAcademicFaculty>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
  },
);

export const AcademicFaculty = model<IAcademicFaculty, IAcademicFacultyModel>(
  'academicFaculty',
  academicDepartmentSchema,
);
