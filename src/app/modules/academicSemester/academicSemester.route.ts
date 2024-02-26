import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { academicSemesterValidation } from './academicSemester.validation';
import { AcademicSemesterController } from './academicSemester.controller';

const router = express.Router();

router
  .get('/get-semester', AcademicSemesterController.getAllSemesters)
  .post(
    '/create-semester',
    validateRequest(academicSemesterValidation.academicSemesterZodSchema),
    AcademicSemesterController?.semesterCreate,
  );

// router.post(
//   '/create-user',
//   validateRequest(userValidation.createUserZodSchema),
//   UserController?.createUser,
// )

export const AcademicSemesterRoutes = router;
