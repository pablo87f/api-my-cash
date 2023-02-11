import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { DbService } from 'src/database/db.service';
import RefreshToken from './entities/refresh-token.entity';
import { sign, verify } from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';

export type CreateGoogleAuthSessionDto = {
  client_id: string;
};
@Injectable()
export class AuthService {
  private refreshTokens: RefreshToken[] = [];
  // private oauthClient: Auth.OAuth2Client;

  constructor(
    private readonly db: DbService,
    private readonly jwtService: JwtService,
  ) {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    // this.oauthClient = new google.auth.OAuth2(clientId, clientSecret);
  }

  async refresh(refreshStr: string): Promise<string | undefined> {
    const refreshToken = await this.retrieveRefreshToken(refreshStr);
    if (!refreshToken) {
      return undefined;
    }

    const user = await this.db.user.findUnique({
      where: { id: refreshToken.userId },
    });

    if (!user) {
      return undefined;
    }

    const accessToken = {
      userId: refreshToken.userId,
    };

    return sign(accessToken, process.env.ACCESS_SECRET, { expiresIn: '1h' });
  }

  private retrieveRefreshToken(
    refreshStr: string,
  ): Promise<RefreshToken | undefined> {
    try {
      const decoded = verify(refreshStr, process.env.REFRESH_SECRET);
      if (typeof decoded === 'string') {
        return undefined;
      }
      return Promise.resolve(
        this.refreshTokens.find((token) => token.id === decoded.id),
      );
    } catch (e) {
      return undefined;
    }
  }

  async login(
    email: string,
    // password: string,
    values: { userAgent: string; ipAddress: string },
  ): Promise<{ accessToken: string } | undefined> {
    const user = await this.db.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      return undefined;
    }
    // verify your user -- use argon2 for password hashing!!
    // if (user.password !== password) {
    //   return undefined;
    // }

    return {
      accessToken: this.jwtService.sign({
        id: user.id,
        sub: user.id,
        email: user.email,
        name: user.name,
      }),
    };

    // return {
    //   accessToken: sign(
    //     {
    //       id: user.id,
    //       sub: user.id,
    //       email: user.email,
    //       name: user.name,
    //     },
    //     process.env.ACCESS_SECRET,
    //     {
    //       expiresIn: '1h',
    //     },
    //   ),
    // };
  }

  private async newRefreshAndAccessToken(
    user: User,
    values: { userAgent: string; ipAddress: string },
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const refreshObject = new RefreshToken({
      id:
        this.refreshTokens.length === 0
          ? 0
          : this.refreshTokens[this.refreshTokens.length - 1].id + 1,
      ...values,
      userId: user.id,
    });
    this.refreshTokens.push(refreshObject);

    return {
      refreshToken: refreshObject.sign(),
      accessToken: sign(
        {
          userId: user.id,
          email: user.email,
          name: user.name,
        },
        process.env.ACCESS_SECRET,
        {
          expiresIn: '1h',
        },
      ),
    };
  }

  async logout(refreshStr): Promise<void> {
    const refreshToken = await this.retrieveRefreshToken(refreshStr);

    if (!refreshToken) {
      return;
    }
    // delete refreshtoken from db
    this.refreshTokens = this.refreshTokens.filter(
      (refreshToken) => refreshToken.id !== refreshToken.id,
    );
  }

  async loginGoogleUser(
    token: string,
    values: { userAgent: string; ipAddress: string },
  ): Promise<{ accessToken: string; refreshToken: string } | undefined> {
    // const tokenInfo = await this.oauthClient.getTokenInfo(token);
    // const user = await this.db.user.findUnique({
    //   where: {
    //     email: tokenInfo.email,
    //   },
    // });
    // if (user) {
    //   return this.newRefreshAndAccessToken(user, values);
    // }
    return undefined;
  }

  async loginGoogle(user: User) {
    return {
      access_token: sign(
        {
          userId: user.id,
          email: user.email,
          name: user.name,
        },
        process.env.ACCESS_SECRET,
        {
          expiresIn: '1h',
        },
      ),
    };
  }

  async signInWithGoogle(data) {
    if (!data.user) throw new BadRequestException();

    let user = await this.db.user.findUnique({ where: { id: data.user.id } });
    if (user) return this.loginGoogle(user);

    user = await this.db.user.findUnique({ where: { email: data.user.email } });
    if (user)
      throw new ForbiddenException(
        "User already exists, but Google account was not connected to user's account",
      );

    try {
      console.log('create new user');
      // const newUser = new User();
      // newUser.firstName = data.user.firstName;
      // newUser.lastName = data.user.lastName;
      // newUser.email = data.user.email;
      // newUser.googleId = data.user.id;
      // await this.usersService.store(newUser);
      // return this.login(newUser);
    } catch (e) {
      throw new Error(e);
    }
  }
}
