import {
  Controller,
  Delete,
  Get,
  Post,
  Request,
  Res,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { ApiBearerAuth, ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/verify')
  async verify(@Request() req) {
    return req?.user;
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('/logout')
  async logout(@Request() req, @Res({ passthrough: true }) res: Response) {
    res.cookie('token', '', { expires: new Date() });
    return 'OK';
  }

  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
        },
        password: {
          type: 'string',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Logado com sucesso',
    schema: {
      type: 'object',
      properties: {
        user: { type: 'object' },
        token: { type: 'string' },
      },
    },
  })
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req, @Res({ passthrough: true }) res: Response) {
    const token = await this.authService.login(req.user);
    res.cookie('token', token, { httpOnly: true });
    return {
      user: req?.user,
      token: token,
    };
  }
}
