import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DbService } from 'src/database/db.service';
import { ConfigModule } from '@nestjs/config';
import PrismaUsersRepository from 'src/@core/domain/infra/repositories/PrismaOrm/prisma-users-repository';
import GoogleOAuthService from 'src/@core/domain/infra/services/GoogleOAuthService/GoogleOAuthService';
import LoginByOAuth from 'src/@core/application/use-cases/auth/login-by-o-auth';
import IOAuthService from 'src/@core/domain/services/IOAuthService';
import IUsersRepository from 'src/@core/domain/repositories/IUsersRepository';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    DbService,
    {
      provide: PrismaUsersRepository,
      useFactory: (db: DbService) => {
        return new PrismaUsersRepository(db);
      },
      inject: [DbService],
    },
    {
      provide: GoogleOAuthService,
      useFactory: () => {
        return new GoogleOAuthService();
      },
    },
    {
      provide: LoginByOAuth,
      useFactory: (
        usersRepository: IUsersRepository,
        oAuthService: IOAuthService,
      ) => {
        return new LoginByOAuth(usersRepository, oAuthService);
      },
      inject: [PrismaUsersRepository, GoogleOAuthService],
    },
  ],
  imports: [ConfigModule.forRoot()],
})
export class AuthModule {}
