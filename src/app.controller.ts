import { Controller, Get } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

@Controller('/')
export class HomeController {
  constructor(private config: ConfigService) {}

  @ApiResponse({ status: 200, description: 'Bem vindo' })
  @Get()
  async listUsuarios() {
    return 'Bem vindo a API . V' + this.config.get('version');
  }
}
