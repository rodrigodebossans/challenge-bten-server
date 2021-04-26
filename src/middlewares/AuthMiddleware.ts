import { NextFunction, Request, Response } from 'express';
import { decode, verify } from 'jsonwebtoken';
import { UninformedDataException } from '@exceptions/UninformedDataException';
import { HttpStatusCodesEnum } from '@enums/HttpStatusCodesEnum';
import UserService from '@services/UserService';

class AuthMiddleware {
  async run(
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void | Response<any>> {
    try {
      const { authorization = null } = req.headers;

      if (!authorization) {
        throw new UninformedDataException(
          HttpStatusCodesEnum.UNAUTHORIZED,
          'No token provided',
        );
      }

      const parts: string[] = authorization.split(' ');

      if (parts.length !== 2) {
        throw new UninformedDataException(
          HttpStatusCodesEnum.INTERNAL_ERROR,
          'Token error',
        );
      }

      const [scheme, token] = parts;

      if (!/^Bearer$/i.test(scheme)) {
        throw new UninformedDataException(
          HttpStatusCodesEnum.UNAUTHORIZED,
          'Token malformatted',
        );
      }

      const secretKey: string = process.env.SECRET_KEY || '';

      verify(token, secretKey);

      const decoded: any = decode(token);
      const { id = null } = decoded;

      const foundUser = await UserService.findUser({ userId: id });

      const tokenDoesNotMatchTheRegistered = foundUser.token !== token;

      if (tokenDoesNotMatchTheRegistered) {
        throw new UninformedDataException(
          HttpStatusCodesEnum.UNAUTHORIZED,
          'The token entered does not match the users current token',
        );
      }

      return next();
    } catch (error) {
      return res
        .status(error?.httpStatusCode || HttpStatusCodesEnum.UNAUTHORIZED)
        .json(error);
    }
  }
}

export default new AuthMiddleware();