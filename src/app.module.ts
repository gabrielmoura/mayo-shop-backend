import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { HomeController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuthModule } from '@common/auth/auth.module';
import { UserModule } from './user/user.module';
import { DatabaseModule } from '@common/db/database.module';
import { ApiModule } from './api/api.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: environments[process.env.NODE_ENV] || '.env',
      envFilePath: '.env',
    }),
    DatabaseModule,
    UserModule,
    AuthModule,
    ApiModule,
  ],
  controllers: [HomeController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
