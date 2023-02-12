import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule, JwtService } from '@nestjs/jwt';
import GetUserAuthInfo from 'src/@core/application/use-cases/auth/get-user-auth-info';
import LoginByOAuth from 'src/@core/application/use-cases/auth/login-by-o-auth';
import PrismaUsersRepository from 'src/@core/domain/infra/repositories/PrismaOrm/prisma-users-repository';
import GoogleOAuthService from 'src/@core/domain/infra/services/GoogleOAuthService/GoogleOAuthService';
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
