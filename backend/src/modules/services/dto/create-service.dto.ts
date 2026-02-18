import { IsString, IsOptional, IsArray, IsInt, IsIn } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  title: string;

  @IsString()
  slug: string;

  @IsOptional()
  @IsString()
  short_description?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  icon?: string;

  @IsOptional()
  @IsArray()
  features?: string[];

  @IsOptional()
  @IsString()
  pricing_info?: string;

  @IsOptional()
  @IsString()
  thumbnail_url?: string;

  @IsOptional()
  @IsIn(['draft', 'published', 'archived'])
  status?: string;

  @IsOptional()
  @IsInt()
  order_index?: number;
}
