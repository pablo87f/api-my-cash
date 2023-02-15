import { parseISO } from 'date-fns';
import { UserAccount } from '../../../domain/entities/user-account';
import { Account } from '../../../domain/entities/account';
import { AuthInfo } from '../../../domain/entities/auth-info';
import { OAuthInfo } from '../../../domain/entities/o-auth-info';
import { User } from '../../../domain/entities/user';

const fakeValidJwtToken = 'FAKE valid jowt token';
const fakeValidOAuthToken = 'FAKE valid oAuth token';

const fakes = {
  constants: {
    validJwtToken: fakeValidJwtToken,
    validOAuthToken: fakeValidOAuthToken,
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
  },
};

export default fakes;
