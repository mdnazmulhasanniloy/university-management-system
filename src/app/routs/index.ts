import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route';

const router = Router();

const modulesRoutes = [
  {
    path: '/users',
    router: UserRoutes,
  },
  {
    path: '/academic-semester',
    router: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculty',
    router: AcademicFacultyRoutes,
  },
  {
    path: '/academic-department',
    router: AcademicDepartmentRoutes,
  },
];
//optimize routes

modulesRoutes?.forEach(route => router?.use(route?.path, route?.router));

export default router;
