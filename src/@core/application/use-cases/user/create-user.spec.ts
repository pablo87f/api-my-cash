import userAccountsRepositoryMock from '../../../domain/repositories/__mocks__/user-accounts-repository.mock';
import accountsRepositoryMock from '../../../domain/repositories/__mocks__/accounts-repository.mock';
import usersRepositoryMock from '../../../domain/repositories/__mocks__/users-repository.mock';
import fakes from '../__mocks__/_fakes';

import CreateUser from './create-user';

const makeSut = () => {
  const sut = new CreateUser(
    usersRepositoryMock,
    accountsRepositoryMock,
    userAccountsRepositoryMock,
  );
  return sut;
};

beforeEach(() => {
  usersRepositoryMock.findOne.mockClear();
  accountsRepositoryMock.create.mockClear();
  userAccountsRepositoryMock.assign.mockClear();
});

describe('Create user', () => {
  it('should create a user when there is no user with same email', async () => {
    const emailKey = 'pablofern87@gmail.com';
    const fakeUser = fakes.entities.users[emailKey];
    const fakeAccount = fakes.entities.accounts[emailKey];

    usersRepositoryMock.findOne.mockResolvedValueOnce(undefined);
    usersRepositoryMock.create.mockResolvedValueOnce(fakeUser);
    accountsRepositoryMock.create.mockResolvedValue(fakeAccount);

    const sut = makeSut();

    const { createdAccount, createdUser } = await sut.execute({
      name: fakeUser.name,
      email: fakeUser.email,
    });

    expect(usersRepositoryMock.findOne).toHaveBeenCalledTimes(1);
    expect(usersRepositoryMock.findOne).toHaveBeenCalledWith({
      email: fakeUser.email,
    });

    expect(usersRepositoryMock.create).toHaveBeenCalledTimes(1);
    expect(usersRepositoryMock.create).toHaveBeenCalledWith({
      name: fakeUser.name,
      email: fakeUser.email,
    });

    expect(accountsRepositoryMock.create).toHaveBeenCalledTimes(1);
    expect(accountsRepositoryMock.create).toHaveBeenCalledWith({
      name: fakeAccount.name,
    });

    expect(userAccountsRepositoryMock.assign).toHaveBeenCalledTimes(1);
    expect(userAccountsRepositoryMock.assign).toHaveBeenCalledWith({
      user_id: fakeUser.id,
      account_id: fakeAccount.id,
      is_owner: true,
    });

    expect(createdUser.name).toEqual(fakeUser.name);
    expect(createdUser.email).toEqual(fakeUser.email);
    expect(createdAccount.name).toEqual(fakeAccount.name);
  });

  it('should return undefined when there is a user with the email', async () => {
    const sut = makeSut();

    const emailKey = 'pablofern87@gmail.com';
    const fakeUser = fakes.entities.users[emailKey];

    usersRepositoryMock.findOne.mockResolvedValue(fakeUser);

    const { createdAccount, createdUser } = await sut.execute({
      name: fakeUser.name,
      email: fakeUser.email,
    });

    expect(usersRepositoryMock.findOne).toHaveBeenCalledTimes(1);
    expect(usersRepositoryMock.findOne).toHaveBeenCalledWith({
      email: fakeUser.email,
    });

    expect(createdUser).toBeUndefined();
    expect(createdAccount).toBeUndefined();
  });
});
