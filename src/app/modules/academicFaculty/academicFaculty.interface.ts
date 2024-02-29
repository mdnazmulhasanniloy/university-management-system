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
