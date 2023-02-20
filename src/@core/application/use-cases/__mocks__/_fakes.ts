import { parseISO } from 'date-fns';
import { UserAccount } from '../../../domain/entities/user-account';
import { Account } from '../../../domain/entities/account';
import { AuthInfo } from '../../../domain/entities/auth-info';
import { OAuthInfo } from '../../../domain/entities/o-auth-info';
import { User } from '../../../domain/entities/user';
import { Purchase } from '../../../domain/entities/purchase';
import { Expense } from '../../../domain/entities/expense';

const fakeValidJwtToken = 'FAKE valid jowt token';
const fakeValidOAuthToken = 'FAKE valid oAuth token';

const fakes = {
  constants: {
    validJwtToken: fakeValidJwtToken,
    validOAuthToken: fakeValidOAuthToken,
    fakeUserEmailKey: 'pablofern87@gmail.com',
  },
  entities: {
    users: {
      'pablofern87@gmail.com': new User({
        email: 'pablofern87@gmail.com',
        name: 'Pablo Fernandes',
        active: true,
        id: 'user1',
      }),
    },
    authInfo: {
      'pablofern87@gmail.com': new AuthInfo({
        id: 'user1',
        name: 'Pablo Fernandes',
        email: 'pablofern87@gmail.com',
        picture: 'http://localhost:3000/pictures/pablo-fernandes.png',
        token: fakeValidJwtToken,
      }),
    },
    oAuthInfo: {
      'pablofern87@gmail.com': new OAuthInfo({
        email: 'pablofern87@gmail.com',
        name: 'Pablo Fernandes',
        picture: 'http://localhost:3000/pictures/pablo-fernandes.png',
      }),
    },
    accounts: {
      'pablofern87@gmail.com': new Account({
        name: 'Personal',
        active: true,
        id: 'account1',
      }),
    },
    userAccounts: {
      'pablofern87@gmail.com': new UserAccount({
        user_id: 'user1',
        account_id: 'account1',
        is_owner: true,
        assigned_at: parseISO('2022-12-01'),
        active: true,
      }),
    },
    purchases: {
      'pablofern87@gmail.com': [
        new Purchase({
          total_amount: 200,
          name: 'Compra fribal',
          user_id: 'user1',
          payment_method: 'DEBIT',
          wallet_id: 'wallet1',
          due_date: parseISO('2022-10-02'),
        }),
        new Purchase({
          total_amount: 350,
          name: 'Compra Mateus',
          user_id: 'user1',
          payment_method: 'CREDIT',
          portions: 1,
          credit_card_id: 'creditcard1',
          due_date: parseISO('2022-10-03'),
        }),
      ],
    },
    takePurchases: (emailKey: string, amount: number) => {
      const purchases: Purchase[] =
        fakes.entities.purchases[emailKey] || ([] as Purchase[]);
      return purchases.slice(0, amount);
    },
    expenses: {
      all: {
        'pablofern87@gmail.com': [
          new Expense({
            name: 'Compra Supermercado',
            amount: 400,
            due_date: parseISO('2022-10-03'),
            id: 'expense1',
            user_id: 'user1',
            purchase_id: 'purchase1',
          }),
          new Expense({
            name: 'Conta de energia - 10/2022',
            amount: 500,
            due_date: parseISO('2022-10-07'),
            id: 'expense2',
            user_id: 'user1',
            recurring_bill_id: 'recurringbill1',
          }),
          new Expense({
            name: 'Compra cacau Show',
            amount: 30,
            due_date: parseISO('2022-10-03'),
            id: 'expense3',
            user_id: 'user1',
            purchase_id: 'purchase2',
          }),
          new Expense({
            id: '1',
            name: 'Compra supermercado',
            amount: 100,
            due_date: parseISO('2022-08-01'),
            user_id: 'users1',
            account_id: 'account1',
          }),
        ],
      },
      sameMonthYear_2022_10: {
        'pablofern87@gmail.com': [
          new Expense({
            name: 'Compra Supermercado',
            amount: 400,
            due_date: parseISO('2022-10-03'),
            id: 'expense1',
            user_id: 'user1',
            purchase_id: 'purchase1',
          }),
          new Expense({
            name: 'Conta de energia - 10/2022',
            amount: 500,
            due_date: parseISO('2022-10-07'),
            id: 'expense2',
            user_id: 'user1',
            recurring_bill_id: 'recurringbill1',
          }),
          new Expense({
            name: 'Compra cacau Show',
            amount: 30,
            due_date: parseISO('2022-10-03'),
            id: 'expense3',
            user_id: 'user1',
            purchase_id: 'purchase2',
          }),
        ],
      },
      account: {
        'pablofern87@gmail.com': new Expense({
          id: '1',
          name: 'Compra supermercado',
          amount: 100,
          due_date: parseISO('2022-08-01'),
          user_id: 'users1',
          account_id: 'account1',
        }),
      },
      take: (emailKey: string, amount: number) => {
        const expenses: Expense[] =
          fakes.entities.expenses[emailKey] || ([] as Expense[]);
        return expenses.slice(0, amount);
      },
    },
  },
};

export default fakes;
