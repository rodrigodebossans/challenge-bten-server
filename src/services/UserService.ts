import dayjs from 'dayjs';
import { hash } from 'bcrypt';
import { DeleteResult, getRepository, Repository } from 'typeorm';
import { User } from '@models/User';
import { Page } from '@models/Page';
import { NonExistentObjectException } from '@exceptions/NonExistentObjectException';
import { HttpStatusCodesEnum } from '@enums/HttpStatusCodesEnum';
import { UninformedDataException } from '@exceptions/UninformedDataException';

class UserService {
  async getUsers(): Promise<Page<User[]>> {
    const userRepository: Repository<User> = getRepository(User);
    const usersQueryBuilder = userRepository.createQueryBuilder('User');
    const pagedUsers = new Page<User[]>(await usersQueryBuilder.paginate());
    return pagedUsers;
  }

  async getUser(userId: string) {
    const user: User = await this.findUser({ userId });

    return user;
  }

  async addUser(user: User): Promise<User> {
    const userRepository: Repository<User> = getRepository(User);

    try {
      const foundUser = await this.findUser({ email: user.email });
      if (foundUser) {
        throw new UninformedDataException(
          HttpStatusCodesEnum.BAD_REQUEST,
          'Email already exists',
        );
      }
    } catch (error) {
      if (error instanceof NonExistentObjectException) {
        user.password = await hash(user.password, 10);
      } else throw error;
    }

    const newUser = await userRepository.save(user);

    return newUser;
  }

  async updateUser(userId: string, user: User) {
    try {
      const userRepository: Repository<User> = getRepository(User);
      user.updatedAt = dayjs().toDate();
      user.password = await hash(user.password, 10);
      await userRepository.update(userId, user);

      const updatedUser: User = await this.findUser({ userId });

      return updatedUser;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async deleteUser(userId: string) {
    const userRepository: Repository<User> = getRepository(User);

    await this.findUser({ userId });

    const deleteResult: DeleteResult = await userRepository.delete(userId);
    return deleteResult;
  }

  async findUser({ userId = null, email = null }): Promise<User> {
    const userRepository: Repository<User> = getRepository(User);

    let foundUser: User;

    if (userId) {
      foundUser = await userRepository.findOne(userId);
    } else if (email) {
      foundUser = await userRepository.findOne({ email });
    }

    if (!foundUser) {
      throw new NonExistentObjectException(
        HttpStatusCodesEnum.BAD_REQUEST,
        'User not found',
      );
    }

    return foundUser;
  }
}

export default new UserService();