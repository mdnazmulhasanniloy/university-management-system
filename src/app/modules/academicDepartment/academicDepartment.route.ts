import express from 'express';
import { AcademicDepartmentController } from './academicDepartment.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
const router = express.Router();

router.post(
  '/create-department',
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentZodSchema,
  ),
  AcademicDepartmentController.createDepartment,
);
router.get('/:id', AcademicDepartmentController.getDepartmentById);
router.put(
  '/:id',
  validateRequest(
    AcademicDepartmentValidation.UpdateAcademicDepartmentZodSchema,
  ),
  AcademicDepartmentController.updateDepartment,
);
router.delete('/:id', AcademicDepartmentController.deleteDepartment);
router.get('/', AcademicDepartmentController.getAllDepartment);
export const AcademicDepartmentRoutes = router;