import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.ACCESS_SECRET,
    });
  }

  validate(payload) {
    // TODO: put the validation here
    // then return the payload to the route

    /** Ex.:
     * const user = await this.authService.validateUser(username, password);
     * if (!user) {
     *    throw new UnauthorizedException();
     * }
     * return user;
     */
    return payload;
  }
}
