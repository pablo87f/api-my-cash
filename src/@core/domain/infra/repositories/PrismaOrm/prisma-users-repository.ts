import { User } from 'src/@core/domain/entities/user';
import IUsersRepository, {
  CreateUserDto,
  UserFiltersDto,
} from 'src/@core/domain/repositories/IUsersRepository';
import { DbService } from 'src/database/db.service';

export default class PrismaUsersRepository implements IUsersRepository {
  constructor(readonly db: DbService) {}
  create(createUserDto: CreateUserDto): Promise<User> {
    throw new Error('Method not implemented.');
  }
  async findOne(filters: UserFiltersDto): Promise<User> {
    const user = await this.db.user.findFirst({
      where: { ...filters },
    });
    return new User(user);
  }
}
