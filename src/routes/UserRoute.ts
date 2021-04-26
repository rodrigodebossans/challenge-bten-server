import { Router } from 'express';
import UserController from '@controllers/UserController';
import AuthController from '@controllers/AuthController';
import AuthMiddleware from '@middlewares/AuthMiddleware';
import DashboardController from '@controllers/DashboardController';

const router: Router = Router();

router.route('/user').post(UserController.addUser).get(UserController.getUsers);

router
  .route('/user/:userId')
  .get(UserController.getUser)
  .put(UserController.updateUser)
  .delete(UserController.deleteUser);

router.route('/auth').post(AuthController.authenticate);

router
  .route('/dashboard')
  .get([AuthMiddleware.run], DashboardController.getData);

export const UserRoutes: Router = router;