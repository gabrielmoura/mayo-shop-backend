import { Module } from '@nestjs/common';
import { UsuarioController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserUniqueValidator } from './validator/userUniqueValidator';

import { JwtStrategy } from '@common/auth/strategies/jwt.strategy';

@Module({
  controllers: [UsuarioController],
  providers: [UserRepository, UserUniqueValidator, JwtStrategy],
  exports: [UserRepository],
})
export class UserModule {}
