import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Logger,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtAuthGuard } from '@common/auth/guards/jwt-auth.guard';
import { ApiQuery } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

@Controller({ version: '1', path: 'product' })
export class ProductController {
  private readonly logger = new Logger(ProductController.name);

  constructor(private readonly productService: ProductService) {}

  @ApiQuery({ name: 'skip', required: false })
  @ApiQuery({ name: 'take', required: false })
  @Get()
  asyncfindAll(@Param('skip') skip?: string, @Param('take') take?: string) {
    try {
      return this.productService.findAll({
        skip: +skip || undefined,
        take: +take || undefined,
      });
    } catch (e) {
      throw new HttpException(e?.meta?.cause, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.productService.findOne({ id });
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    try {
      const cdata = await this.productService.update({
        where: { id },
        data: updateProductDto,
      });
      return {
        message: 'Atualizado com sucesso',
        data: cdata,
      };
    } catch (e) {
      if (!(e instanceof Prisma.PrismaClientKnownRequestError)) {
        this.logger.error(e);
      }
      throw new HttpException(e?.meta?.cause, HttpStatus.BAD_REQUEST);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.productService.remove({ id });
  }
}
