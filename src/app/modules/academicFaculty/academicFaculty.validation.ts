import { z } from 'zod';
import { academicFacultyGender } from './academicFaculty.constant';

const academicFacultyZodSchema = z.object({
  body: z.object({
    name: z.object({
      firstName: z.string({ required_error: 'First name is required' }),
      middleName: z.string().optional(),
      lastName: z.string({ required_error: 'Last name is required' }),
    }),
    gender: z.enum([...academicFacultyGender] as [string, ...string[]], {
      required_error: 'Gender is required',
    }),
    dateOfBirth: z.string({ required_error: 'Date of Birth is required' }),
    email: z.string({ required_error: 'Email is required' }).email(),
    contactNo: z.number({ required_error: 'Contact No is required' }),
    emergencyContactNo: z.number({
      required_error: 'Emergency Contact No is required',
    }),
    department: z.string({ required_error: 'Department is required' }),
    faculty: z.string({ required_error: 'faculty is required' }),
    designation: z.string({ required_error: 'Designation is required' }),
    presentAddress: z.object({
      road: z.string({ required_error: 'Address is required' }),
      city: z.string({ required_error: 'City is required' }),
      state: z.string({ required_error: 'State is required' }),
      country: z.string({ required_error: 'country is required' }),
    }),
    permanentAddress: z.object({
      road: z.string({ required_error: 'Address is required' }),
      city: z.string({ required_error: 'City is required' }),
      state: z.string({ required_error: 'State is required' }),
      country: z.string({ required_error: 'country is required' }),
    }),
  }),
});

const updateAcademicFacultyZodSchema = z.object({
  body: z.object({
    name: z
      .object({
        firstName: z
          .string({ required_error: 'First name is required' })
          .optional(),
        middleName: z.string().optional(),
        lastName: z
          .string({ required_error: 'Last name is required' })
          .optional(),
      })
      .optional(),
    gender: z
      .enum([...academicFacultyGender] as [string, ...string[]], {
        required_error: 'Gender is required',
      })
      .optional(),
    dateOfBirth: z
      .string({ required_error: 'Date of Birth is required' })
      .optional(),
    email: z.string({ required_error: 'Email is required' }).email().optional(),
    contactNo: z
      .number({ required_error: 'Contact No is required' })
      .optional(),
    emergencyContactNo: z
      .number({
        required_error: 'Emergency Contact No is required',
      })
      .optional(),
    department: z
      .string({ required_error: 'Department is required' })
      .optional(),
    faculty: z.string({ required_error: 'faculty is required' }).optional(),
    designation: z
      .string({ required_error: 'Designation is required' })
      .optional(),
    presentAddress: z
      .object({
        road: z.string({ required_error: 'Address is required' }).optional(),
        city: z.string({ required_error: 'City is required' }).optional(),
        state: z.string({ required_error: 'State is required' }).optional(),
        country: z.string({ required_error: 'country is required' }).optional(),
      })
      .optional(),
    permanentAddress: z
      .object({
        road: z.string({ required_error: 'Address is required' }).optional(),
        city: z.string({ required_error: 'City is required' }).optional(),
        state: z.string({ required_error: 'State is required' }).optional(),
        country: z.string({ required_error: 'country is required' }).optional(),
      })
      .optional(),
  }),
});

export const academicFacultyValidation = {
  academicFacultyZodSchema,
  updateAcademicFacultyZodSchema,
};
