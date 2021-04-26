import { HttpStatusCodesEnum } from '@enums/HttpStatusCodesEnum';
import { UninformedDataException } from '@exceptions/UninformedDataException';
import { User } from '@models/User';
import AuthService from '@services/AuthService';
import { Request, Response } from 'express';

class AuthController {
  async authenticate(req: Request, res: Response): Promise<Response<User>> {
    try {
      const { email = null, password = null } = req.body;

      if (!email) {
        throw new UninformedDataException(
          HttpStatusCodesEnum.BAD_REQUEST,
          'Missing email',
        );
      }

      if (!password) {
        throw new UninformedDataException(
          HttpStatusCodesEnum.BAD_REQUEST,
          'Missing password',
        );
      }

      const authenticatedUser: User = await AuthService.authenticate(
        email,
        password,
      );

      return res.status(200).json(authenticatedUser);
    } catch (error) {
      return res.status(error?.httpStatusCode).json(error);
    }
  }
}

export default new AuthController();