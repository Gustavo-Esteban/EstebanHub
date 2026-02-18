import { IsString, IsOptional, IsBoolean, IsArray, IsInt, IsIn } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  title: string;

  @IsString()
  slug: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  short_description?: string;

  @IsOptional()
  @IsString()
  client_name?: string;

  @IsOptional()
  @IsString()
  project_url?: string;

  @IsOptional()
  @IsString()
  thumbnail_url?: string;

  @IsOptional()
  @IsArray()
  images?: string[];

  @IsOptional()
  @IsArray()
  technologies?: string[];

  @IsOptional()
  @IsIn(['institutional', 'ecommerce', 'landing-page'])
  category?: string;

  @IsOptional()
  @IsBoolean()
  featured?: boolean;

  @IsOptional()
  @IsIn(['draft', 'published', 'archived'])
  status?: string;

  @IsOptional()
  @IsInt()
  order_index?: number;
}
