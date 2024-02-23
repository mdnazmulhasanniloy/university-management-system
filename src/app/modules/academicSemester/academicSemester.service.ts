import { IAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.models';

const createSemester = async (
  data: IAcademicSemester,
): Promise<IAcademicSemester | null> => {
  const createdUser = await AcademicSemester.create(data);
  return createdUser;
};

export const AcademicSemesterService = { createSemester };
