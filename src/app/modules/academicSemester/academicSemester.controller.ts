import { RequestHandler } from 'express';
import { AcademicSemesterService } from './academicSemester.service';
import ApiError from '../../../errors/api.errors';

const semesterCreate: RequestHandler = async (req, res, next) => {
  try {
    const data = req.body;
    const result = await AcademicSemesterService?.createSemester(data);

    if (!result) {
      throw new ApiError(400, 'academic semester creation failed');
    }
    res.status(200).json({
      success: true,
      message: 'academic semester created successfully!',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const AcademicSemesterController = {
  semesterCreate,
};
