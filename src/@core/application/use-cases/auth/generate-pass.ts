import bcrypt from 'bcrypt';

export type GeneratePassDto = {
  password: string;
};

export type GeneratePassReturn = {
  password: string;
  salt: string;
};

export default class GeneratePass {
  private SALT_ROUNDS = 10;

  async execute({ password }: GeneratePassDto): Promise<GeneratePassReturn> {
    const salt = await bcrypt.genSalt(this.SALT_ROUNDS);
    const encryptedPassword = await bcrypt.hash(password, salt);
    return { password: encryptedPassword, salt };
  }
}
