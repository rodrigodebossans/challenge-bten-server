import { HttpStatusCodesEnum } from '@enums/HttpStatusCodesEnum';
import { UninformedDataException } from '@exceptions/UninformedDataException';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {
    name: 'home_team',
    nullable: true,
  })
  homeTeam: string;

  @Column('varchar')
  name: string;

  @Column('varchar', {
    unique: true,
  })
  email: string;

  @Column('varchar')
  password: string;

  @Column('int')
  age: number;

  @Column('double precision')
  height: number;

  @Column('varchar', {
    nullable: true,
  })
  token?: string;

  @Column('timestamp', {
    default: 'NOW()',
  })
  createdAt: Date;

  @Column('timestamp', {
    onUpdate: 'NOW()',
    nullable: true,
  })
  updatedAt: Date;

  static fromUser(obj: any): User {
    const user: User = new User();
    if (obj) {
      user.id = obj?.id;
      user.homeTeam = obj?.homeTeam;
      user.name = obj?.name;
      user.email = obj?.email;
      user.password = obj?.password;
      user.age = obj?.age;
      user.height = obj.height;
      user.createdAt = obj?.createdAt;
      user.updatedAt = obj?.updatedAt;
    }
    return user;
  }

  static validate(user: User): void {
    const {
      name = null,
      email = null,
      password = null,
      age = null,
    } = user;

    if (!name) {
      throw new UninformedDataException(
        HttpStatusCodesEnum.BAD_REQUEST,
        'Name is missing',
      );
    }

    if (!age) {
      throw new UninformedDataException(
        HttpStatusCodesEnum.BAD_REQUEST,
        'Age is missing',
      );
    }

    if (!email) {
      throw new UninformedDataException(
        HttpStatusCodesEnum.BAD_REQUEST,
        'Email is missing',
      );
    } else {
      const pattern = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})?$/;
      if (!pattern.test(email)) {
        throw new UninformedDataException(
          HttpStatusCodesEnum.BAD_REQUEST,
          'Invalid email',
        );
      }
    }

    if (!password) {
      throw new UninformedDataException(
        HttpStatusCodesEnum.BAD_REQUEST,
        'Password is missing',
      );
    }
  }
}