import { Router } from 'express';
import { UserRoutes } from '../modules/user/user.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';

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
];
//optimize routes

modulesRoutes?.forEach(route => router?.use(route?.path, route?.router));

export default router;
