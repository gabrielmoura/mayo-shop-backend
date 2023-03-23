import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from '../../user/user.repository';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserRepository,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    try {
      const user = await this.usersService.getUser({ email });
      // console.log(user);

      if (user && (await argon2.verify(user.password, pass))) {
        return user;
      }
      return null;
    } catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.UNAUTHORIZED,
          error: 'Email ou senha incorretos',
        },
        HttpStatus.UNAUTHORIZED,
      );
    }
  }

  async login(user: any) {
    const payload = {
      username: user.name,
      sub: user.id,
      role: user.role?.name,
    };
    return await this.jwtService.signAsync(payload);
  }
}
