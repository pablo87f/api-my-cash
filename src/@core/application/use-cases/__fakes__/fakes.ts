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
        users_ids: ['user1'],
        active: true,
        id: 'account1',
      }),
    },
  },
};

export default fakes;
