import { Account } from '../../../domain/entities/account';
import { User } from '../../../domain/entities/user';
import accountsRepositoryMock from '../../../domain/repositories/__mocks__/accounts-repository.mock';
import usersRepositoryMock from '../../../domain/repositories/__mocks__/users-repository.mock';

import CreateUser from './create-user';

const makeSut = () => {
  const sut = new CreateUser(usersRepositoryMock, accountsRepositoryMock);
  return sut;
};

beforeEach(() => {
  usersRepositoryMock.findOne.mockClear();
  usersRepositoryMock.create.mockClear();
  accountsRepositoryMock.findOne.mockClear();
});

describe('Create user', () => {
  it('should create a user', async () => {
    usersRepositoryMock.findOne.mockResolvedValueOnce(
      new User({
        email: 'user1@gmail.com',
        name: 'User 1',
        id: 'user1',
      }),
    );

    usersRepositoryMock.create.mockResolvedValueOnce(
      new User({
        email: 'user1@gmail.com',
        name: 'User 1',
        id: 'user1',
      }),
    );

    accountsRepositoryMock.create.mockResolvedValue(
      new Account({
        name: 'Personal',
        users_ids: ['user1'],
        id: 'account1',
      }),
    );

    const sut = makeSut();

    const { createdAccount, createdUser } = await sut.execute({
      name: 'User 1',
      email: 'user1@gmail.com',
    });

    expect(usersRepositoryMock.findOne).toHaveBeenCalledTimes(1);
    expect(usersRepositoryMock.findOne).toHaveBeenCalledWith({
      email: 'user1@gmail.com',
    });

    expect(usersRepositoryMock.create).toHaveBeenCalledTimes(1);
    expect(usersRepositoryMock.create).toHaveBeenCalledWith({
      name: 'User 1',
      email: 'user1@gmail.com',
    });

    expect(accountsRepositoryMock.create).toHaveBeenCalledTimes(1);
    expect(accountsRepositoryMock.create).toHaveBeenCalledWith({
      name: 'Personal',
      users_ids: ['user1'],
    });

    expect(createdUser.name).toEqual('User 1');
    expect(createdUser.email).toEqual('user1@gmail.com');
    expect(createdAccount.users_ids).toContain('user1');
  });

  it('should not create with duplicated email', async () => {
    usersRepositoryMock.findOne.mockResolvedValue(undefined);
    const sut = makeSut();

    const { createdAccount, createdUser } = await sut.execute({
      name: 'User 1',
      email: 'user1@gmail.com',
    });

    expect(usersRepositoryMock.findOne).toHaveBeenCalledTimes(1);
    expect(usersRepositoryMock.findOne).toHaveBeenCalledWith({
      email: 'user1@gmail.com',
    });

    expect(createdUser).toBeUndefined();
    expect(createdAccount).toBeUndefined();
  });
});
