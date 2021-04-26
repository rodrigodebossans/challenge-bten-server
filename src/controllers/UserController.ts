import { Request, Response } from 'express';
import { User } from '@models/User';
import UserService from '@services/UserService';
import { Page } from '@models/Page';
import { UninformedDataException } from '@exceptions/UninformedDataException';
import { NonExistentObjectException } from '@exceptions/NonExistentObjectException';
import { HttpStatusCodesEnum } from '@enums/HttpStatusCodesEnum';

class UserController {
  async getUsers(req: Request, res: Response): Promise<Response<Page<User[]>>> {
    try {
      const pagedUsers: Page<User[]> = await UserService.getUsers();
      return res.status(HttpStatusCodesEnum.OK).json(pagedUsers);
    } catch (error) {
      console.error(error);
      return res
        .status(HttpStatusCodesEnum.INTERNAL_ERROR)
        .json({ error: error.message });
    }
  }

  async getUser(req: Request, res: Response): Promise<Response> {
    try {
      const { userId = null } = req.params;

      if (!userId) {
        throw new UninformedDataException(
          HttpStatusCodesEnum.BAD_REQUEST,
          'UserId is missing',
        );
      }

      const user: User = await UserService.getUser(userId);

      if (!user) {
        throw new NonExistentObjectException(
          HttpStatusCodesEnum.NOT_FOUND,
          'User not found',
        );
      }

      return res.status(HttpStatusCodesEnum.OK).json(user);
    } catch (error) {
      console.error(error);
      return res.status(error?.httpStatusCode).json(error);
    }
  }

  async addUser(req: Request, res: Response): Promise<Response> {
    try {
      const user: User = User.fromUser(req.body);
      User.validate(user);
      const newUser: User = await UserService.addUser(user);

      return res.status(HttpStatusCodesEnum.OK).json(newUser);
    } catch (error) {
      console.error(error);
      return res.status(error?.httpStatusCode).json(error);
    }
  }

  async updateUser(req: Request, res: Response): Promise<Response> {
    try {
      const { userId = null } = req.params;

      if (!userId) {
        throw new UninformedDataException(
          HttpStatusCodesEnum.BAD_REQUEST,
          'UserId is missing',
        );
      }

      const { email = null } = req.body;

      if (email) {
        throw new UninformedDataException(
          HttpStatusCodesEnum.BAD_REQUEST,
          'Email is not editable',
        );
      }

      const updatedUser: User = await UserService.updateUser(userId, req.body);

      if (!updatedUser) {
        throw new NonExistentObjectException(
          HttpStatusCodesEnum.NOT_FOUND,
          'User not found',
        );
      }

      return res.status(HttpStatusCodesEnum.OK).json(updatedUser);
    } catch (error) {
      console.error(error);
      return res.status(error?.httpStatusCode).json(error);
    }
  }

  async deleteUser(req: Request, res: Response): Promise<Response> {
    try {
      const { userId = null } = req.params;

      if (!userId) {
        throw new UninformedDataException(
          HttpStatusCodesEnum.BAD_REQUEST,
          'UserId is missing',
        );
      }

      const result = await UserService.deleteUser(userId);

      return res.status(HttpStatusCodesEnum.OK).json(result);
    } catch (error) {
      console.error(error);
      return res.status(error?.httpStatusCode).json(error);
    }
  }
}

export default new UserController();