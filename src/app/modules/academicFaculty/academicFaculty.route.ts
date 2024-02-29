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
