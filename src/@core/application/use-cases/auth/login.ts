export type LoginDto = {
  email: string;
  password: string;
};

export default class Login {
  constructor(readonly user: IUser) {}

  async execute({ email, password }: LoginDto): Promise<boolean> {
    return true;
  }
}
