import { parseISO } from 'date-fns';
import { CreditCard } from '../../../domain/entities/credit-card';
import { Purchase } from '../../../domain/entities/purchase';
import { Wallet } from '../../../domain/entities/wallet';
import creditCardsRepositoryMock from '../../../domain/repositories/__mocks__/credit-cards-repository.mock';
import purchasesRepositoryMock from '../../../domain/repositories/__mocks__/purchases-repository.mock';
import walletsRepositoryMock from '../../../domain/repositories/__mocks__/wallets-repository.mock';
import DeletePurchase from './delete-purchase';

const makeSut = () => {
  const sut = new DeletePurchase(
    purchasesRepositoryMock,
    walletsRepositoryMock,
    creditCardsRepositoryMock,
  );
  return sut;
};

beforeEach(() => {
  purchasesRepositoryMock.findOne.mockClear();
  purchasesRepositoryMock.update.mockClear();
  purchasesRepositoryMock.delete.mockClear();
  walletsRepositoryMock.findOne.mockClear();
  walletsRepositoryMock.update.mockClear();
  creditCardsRepositoryMock.findOne.mockClear();
  creditCardsRepositoryMock.update.mockClear();
});

describe('Delete purchase', () => {
  it('should delete a purchase paid with credit card', async () => {
    const fakePurchase = new Purchase({
      id: 'purchase1',
      due_date: parseISO('2022-10-08'),
      name: 'Fone de ouvido',
      payment_method: 'CREDIT',
      total_amount: 300,
      active: true,
      portions: 3,
      user_id: 'user1',
      credit_card_id: 'creditcard1',
    });

    const fakeCreditCard = new CreditCard({
      name: 'Cartão Nubank',
      total_limit: 12000,
      spent_amount: 1000,
      id: 'creditcard1',
      user_id: 'user1',
    });

    const fakeUpdatedCreditCard = new CreditCard({
      name: 'Cartão Nubank',
      total_limit: 12000,
      spent_amount: 700,
      id: 'creditcard1',
      user_id: 'user1',
    });

    const fakeDeletedPurchase = new Purchase({
      id: 'purchase1',
      due_date: parseISO('2022-10-08'),
      name: 'Fone de ouvido',
      payment_method: 'CREDIT',
      total_amount: 300,
      active: true,
      portions: 3,
      user_id: 'user1',
      credit_card_id: 'creditcard1',
    });

    purchasesRepositoryMock.findOne.mockResolvedValueOnce(fakePurchase);
    creditCardsRepositoryMock.findOne.mockResolvedValueOnce(fakeCreditCard);
    creditCardsRepositoryMock.update.mockResolvedValueOnce(
      fakeUpdatedCreditCard,
    );
    purchasesRepositoryMock.delete.mockResolvedValueOnce(fakeDeletedPurchase);

    const sut = makeSut();

    const purchase = await sut.execute('purchase1', 'user1');

    expect(purchasesRepositoryMock.findOne).toHaveBeenCalledTimes(1);
    expect(purchasesRepositoryMock.findOne).toHaveBeenCalledWith('purchase1');

    expect(creditCardsRepositoryMock.findOne).toHaveBeenCalledTimes(1);
    expect(creditCardsRepositoryMock.findOne).toHaveBeenCalledWith({
      id: 'creditcard1',
      user_id: 'user1',
    });

    expect(creditCardsRepositoryMock.update).toHaveBeenCalledTimes(1);
    expect(creditCardsRepositoryMock.update).toHaveBeenCalledWith(
      'creditcard1',
      {
        spent_amount: 700,
      },
    );

    expect(purchase).toBeDefined();
    expect(purchase).toBeInstanceOf(Purchase);
  });

  it('should delete a purchase paid with debit wallet', async () => {
    const fakePurchase = new Purchase({
      id: 'purchase1',
      due_date: parseISO('2022-10-08'),
      name: 'Fone de ouvido',
      payment_method: 'DEBIT',
      total_amount: 400,
      active: true,
      user_id: 'user1',
      wallet_id: 'wallet1',
    });

    const fakeWallet = new Wallet({
      id: 'wallet1',
      name: 'Conta Nubank',
      amount: 300,
      user_id: 'user1',
    });
    const fakeUpdatedWallet = new Wallet({
      id: 'wallet1',
      name: 'Conta Nubank',
      amount: 700,
      user_id: 'user1',
    });
    const fakeDeletedPurchase = new Purchase({
      id: 'purchase1',
      due_date: parseISO('2022-10-08'),
      name: 'Fone de ouvido',
      payment_method: 'DEBIT',
      total_amount: 400,
      active: true,
      user_id: 'user1',
      wallet_id: 'wallet1',
    });

    purchasesRepositoryMock.findOne.mockResolvedValueOnce(fakePurchase);
    walletsRepositoryMock.findOne.mockResolvedValueOnce(fakeWallet);
    walletsRepositoryMock.update.mockResolvedValueOnce(fakeUpdatedWallet);
    purchasesRepositoryMock.delete.mockResolvedValueOnce(fakeDeletedPurchase);

    const sut = makeSut();

    const purchase = await sut.execute('purchase1', 'user1');

    expect(purchasesRepositoryMock.findOne).toHaveBeenCalledTimes(1);
    expect(purchasesRepositoryMock.findOne).toHaveBeenCalledWith('purchase1');

    expect(walletsRepositoryMock.findOne).toHaveBeenCalledTimes(1);
    expect(walletsRepositoryMock.findOne).toHaveBeenCalledWith({
      id: 'wallet1',
      user_id: 'user1',
    });

    expect(walletsRepositoryMock.update).toHaveBeenCalledTimes(1);
    expect(walletsRepositoryMock.update).toHaveBeenCalledWith({
      id: 'wallet1',
      dataToUpdate: {
        amount: 700,
      },
    });

    expect(purchasesRepositoryMock.delete).toHaveBeenCalledTimes(1);
    expect(purchasesRepositoryMock.delete).toHaveBeenCalledWith('purchase1');

    expect(purchase).toBeDefined();
    expect(purchase).toBeInstanceOf(Purchase);
  });
});
