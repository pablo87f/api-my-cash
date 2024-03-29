import { Purchase, PurchaseProps } from 'src/@core/domain/entities/purchase';
import IPurchasesRepository from 'src/@core/domain/repositories/IPurchasesRepository';

type Input = {
  user_id: string;
};

export default class RetrievePurchasesByUser {
  constructor(readonly purchasesRepository: IPurchasesRepository) {}

  async execute({ user_id }: Input): Promise<PurchaseProps[]> {
    return this.purchasesRepository.retrieve({ user_id });
  }
}
