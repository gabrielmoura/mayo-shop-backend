import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ required: true })
  @IsString()
  name: string;

  @ApiProperty({ required: true, type: Number, example: 100 })
  @IsNumber()
  price: number;

  @ApiProperty({
    required: true,
    type: String,
    example: 'https://i.imgur.com/removed.png',
  })
  @IsString()
  img: string;

  @ApiProperty({ required: false })
  @IsString()
  description: string;

  @ApiProperty({ required: false })
  @IsString()
  collection: string;

  @ApiProperty({ required: true })
  @IsString()
  link: string;

  @ApiProperty({ required: false })
  album?: string[];

  @ApiProperty({ required: false })
  size?: string[];
}
