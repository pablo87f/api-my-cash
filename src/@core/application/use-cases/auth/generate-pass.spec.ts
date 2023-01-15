import GeneratePass from './generate-pass';

const makeSut = () => {
  const sut = new GeneratePass();
  return sut;
};

describe('Create credit card', () => {
  it('should generate a password encripted', async () => {
    const sut = makeSut();

    const encryptedPassword = await sut.execute({
      password: '123456',
    });

    expect(encryptedPassword).toBeDefined();
    expect(encryptedPassword).toHaveProperty('password');
    expect(encryptedPassword).toHaveProperty('salt');
    expect(encryptedPassword.password.length).toBeGreaterThan(0);
    expect(encryptedPassword.salt.length).toBeGreaterThan(0);
  });
});
