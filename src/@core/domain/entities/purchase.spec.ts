import { parseISO } from 'date-fns';
import Constants from '../../constants';
import { Purchase } from './purchase';

describe('Purchase', () => {
  it('should be defined passing an id', () => {
    const purchase = new Purchase({
      id: 'purchase1',
      name: 'Compra supermercado',
      total_amount: 350,
      portions: 1,
      payment_method: 'DEBIT',
      due_date: parseISO('2022-08-10'),
      active: true,
      user_id: Constants.fakeUser.id,
    });

    expect(purchase).toBeInstanceOf(Purchase);
    expect(purchase.id).toEqual('purchase1');
    expect(purchase.name).toEqual('Compra supermercado');
    expect(purchase.total_amount).toEqual(350);
    expect(purchase.portions).toEqual(1);
    expect(purchase.payment_method).toEqual('DEBIT');
    expect(purchase.due_date).toEqual(parseISO('2022-08-10'));
    expect(purchase.active).toEqual(true);
    expect(purchase.user_id).toEqual(Constants.fakeUser.id);
  });

  it('should be defined without pass an id', () => {
    const purchase = new Purchase({
      name: 'Compra supermercado',
      total_amount: 350,
      portions: 1,
      payment_method: 'DEBIT',
      due_date: parseISO('2022-08-10'),
      active: true,
      user_id: Constants.fakeUser.id,
    });

    expect(purchase).toBeInstanceOf(Purchase);
    expect(purchase.id).toBeDefined();
    expect(purchase.name).toEqual('Compra supermercado');
    expect(purchase.total_amount).toEqual(350);
    expect(purchase.portions).toEqual(1);
    expect(purchase.payment_method).toEqual('DEBIT');
    expect(purchase.due_date).toEqual(parseISO('2022-08-10'));
    expect(purchase.active).toEqual(true);
    expect(purchase.user_id).toEqual(Constants.fakeUser.id);
  });
});
