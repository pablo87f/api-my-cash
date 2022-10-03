import IExpensesRepository from 'src/@core/domain/repositories/IExpensesRepository';

export default class RetrieveExpenses {
  constructor(readonly expensesRepository: IExpensesRepository) {}

  async execute(user_id: string) {
    const creditCards = await this.expensesRepository.retrieve(user_id);
    return creditCards;
  }
}
