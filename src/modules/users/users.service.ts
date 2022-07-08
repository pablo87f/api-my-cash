import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { DbService } from '../../database/db.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private db: DbService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { name, email } = createUserDto;
    const user = await this.db.user.create({ data: { name, email } });
    return user;
  }

  async findAll(): Promise<User[]> {
    const users = await this.db.user.findMany();
    return users;
  }

  async findOne(id: string): Promise<User | null> {
    const users = await this.db.user.findFirst({
      where: {
        id,
      },
    });
    return users;
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto,
  ): Promise<User | undefined> {
    const user = await this.findOne(id);
    if (user) {
      const updatedUser = await this.db.user.update({
        data: {
          ...updateUserDto,
        },
        where: {
          id,
        },
      });
      return updatedUser;
    }
    return undefined;
  }

  async remove(id: string): Promise<User> {
    const user = await this.findOne(id);
    if (user) {
      const deletedUser = await this.db.user.delete({
        where: {
          id,
        },
      });

      return deletedUser;
    }
    return undefined;
  }
}
