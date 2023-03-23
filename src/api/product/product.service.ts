import { Injectable } from '@nestjs/common';
import { PrismaService } from '@common/db/prisma.service';
import { Prisma, Product } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  create(createProductDto: Prisma.ProductCreateInput) {
    return this.prisma.product.create({
      data: createProductDto,
    });
  }

  async findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProductWhereUniqueInput;
    where?: Prisma.ProductWhereInput;
    orderBy?: Prisma.ProductOrderByWithRelationInput;
  }): Promise<{ data: Product[]; count: number }> {
    const { skip, take, cursor, where, orderBy } = params;
    const [data, count] = await this.prisma.$transaction([
      this.prisma.product.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
      }),
      this.prisma.product.count({ where }),
    ]);
    return { data, count };
  }

  async findOne(where: Prisma.ProductWhereUniqueInput) {
    return this.prisma.product.findUnique({
      where,
    });
  }

  async update(params: {
    where: Prisma.ProductWhereUniqueInput;
    data: Prisma.ProductUpdateInput;
  }) {
    const { where, data } = params;
    return this.prisma.product.update({
      data,
      where,
    });
  }

  async remove(where: Prisma.ProductWhereUniqueInput) {
    return this.prisma.product.delete({
      where,
    });
  }
}
