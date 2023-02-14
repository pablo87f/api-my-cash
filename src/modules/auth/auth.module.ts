import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import GetUserAuthInfo from 'src/@core/application/use-cases/auth/get-user-auth-info';
import LoginByOAuth from 'src/@core/application/use-cases/auth/login-by-o-auth';
import SignInByOAuth from 'src/@core/application/use-cases/auth/sign-in-by-o-auth';
import SignUpByOAuth from 'src/@core/application/use-cases/auth/sign-up-by-o-auth';
import CreateUser from 'src/@core/application/use-cases/user/create-user';
import PrismaAccountsRepository from 'src/@core/domain/infra/repositories/PrismaOrm/prisma-accounts-repository';
import PrismaUsersRepository from 'src/@core/domain/infra/repositories/PrismaOrm/prisma-users-repository';
import GoogleOAuthService from 'src/@core/domain/infra/services/GoogleOAuthService/GoogleOAuthService';
import IAccountsRepository from 'src/@core/domain/repositories/IAccountsRepository';
import IUsersRepository from 'src/@core/domain/repositories/IUsersRepository';
import IJwtService from 'src/@core/domain/services/IJwtService';
import IOAuthService from 'src/@core/domain/services/IOAuthService';
import { DbService } from 'src/database/db.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  controllers: [AuthController],
  providers: [
    DbService,
    JwtStrategy,
    AuthService,
    GoogleOAuthService,
    {
      provide: PrismaUsersRepository,
      useFactory: (db: DbService) => {
        return new PrismaUsersRepository(db);
      },
      inject: [DbService],
    },
    {
      provide: PrismaAccountsRepository,
      useFactory: (db: DbService) => {
        return new PrismaAccountsRepository(db);
      },
      inject: [DbService],
    },
    {
      provide: CreateUser,
      useFactory: (
        usersRepository: IUsersRepository,
        accountRepository: IAccountsRepository,
      ) => {
        return new CreateUser(usersRepository, accountRepository);
      },
      inject: [PrismaUsersRepository, PrismaAccountsRepository],
    },
    {
      provide: GetUserAuthInfo,
      useFactory: (jwtService: IJwtService) => {
        return new GetUserAuthInfo(jwtService);
      },
      inject: [JwtService],
    },
    {
      provide: LoginByOAuth,
      useFactory: (
        usersRepository: IUsersRepository,
        oAuthService: IOAuthService,
        getUserAuthInfo: GetUserAuthInfo,
      ) => {
        return new LoginByOAuth(usersRepository, oAuthService, getUserAuthInfo);
      },
      inject: [PrismaUsersRepository, GoogleOAuthService, GetUserAuthInfo],
    },
    {
      provide: SignUpByOAuth,
      useFactory: (
        oAuthService: IOAuthService,
        createUser: CreateUser,
        getUserAuthInfo: GetUserAuthInfo,
      ) => {
        return new SignUpByOAuth(oAuthService, createUser, getUserAuthInfo);
      },
      inject: [GoogleOAuthService, CreateUser, GetUserAuthInfo],
    },
    {
      provide: SignInByOAuth,
      useFactory: (
        loginByOAuth: LoginByOAuth,
        signUpByOAuth: SignUpByOAuth,
      ) => {
        return new SignInByOAuth(loginByOAuth, signUpByOAuth);
      },
      inject: [LoginByOAuth, SignUpByOAuth],
    },
  ],
  imports: [
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.ACCESS_SECRET,
      signOptions: {
        expiresIn: '1h',
      },
    }),
  ],
})
export class AuthModule {}
