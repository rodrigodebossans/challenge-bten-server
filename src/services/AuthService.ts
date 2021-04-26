import { sign } from 'jsonwebtoken';
import { compare } from 'bcrypt';
import { getRepository, Repository } from 'typeorm';
import { User } from '@models/User';
import { UninformedDataException } from '@exceptions/UninformedDataException';
import { HttpStatusCodesEnum } from '@enums/HttpStatusCodesEnum';
import UserService from './UserService';

class AuthService {
  async authenticate(email: string, password: string): Promise<User> {
    const foundUser: User = await UserService.findUser({ email });

    const isCorrectPassword: boolean = await compare(
      password,
      foundUser.password,
    );

    if (isCorrectPassword) {
      const secretKey: string = process.env.SECRET_KEY || '';
      const tokenInspirationTime = parseInt(process.env.TOKEN_INSPIRATION_TIME) || 3600;

      foundUser.token = sign({ id: foundUser.id }, secretKey, {
        expiresIn: tokenInspirationTime,
      });
    } else {
      throw new UninformedDataException(
        HttpStatusCodesEnum.BAD_REQUEST,
        'Invalid credentials',
      );
    }

    const userRepository: Repository<User> = getRepository(User);
    const authenticatedUser: User = await userRepository.save(foundUser);

    return authenticatedUser;
  }
}

export default new AuthService();