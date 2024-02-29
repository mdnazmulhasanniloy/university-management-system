import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { academicSemesterValidation } from './academicSemester.validation';
import { AcademicSemesterController } from './academicSemester.controller';

const router = express.Router();

router.post(
  '/create-semester',
  validateRequest(academicSemesterValidation.academicSemesterZodSchema),
  AcademicSemesterController?.semesterCreate,
);
router.get('/:id', AcademicSemesterController?.getSemesterById);
router.patch(
  '/:id',
  validateRequest(academicSemesterValidation?.UpdateAcademicSemesterZodSchema),
  AcademicSemesterController?.updateSemester,
);
router.delete('/:id', AcademicSemesterController?.deleteSemester);
router.get('/', AcademicSemesterController?.getAllSemesters);

export const AcademicSemesterRoutes = router;
