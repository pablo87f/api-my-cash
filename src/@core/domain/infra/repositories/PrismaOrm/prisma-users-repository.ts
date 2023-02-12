import { User } from 'src/@core/domain/entities/user';
import IUsersRepository, {
  CreateUserDto,
  UserFiltersDto,
} from 'src/@core/domain/repositories/IUsersRepository';
import { DbService } from 'src/database/db.service';

export default class PrismaUsersRepository implements IUsersRepository {
  constructor(readonly db: DbService) {}
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { name, email } = createUserDto;
    const user = await this.db.user.create({ data: { name, email } });
    return new User(user);
  }
  async findOne(filters: UserFiltersDto): Promise<User> {
    const user = await this.db.user.findFirst({
      where: { ...filters },
    });
    return user ? new User(user) : undefined;
  }
}
