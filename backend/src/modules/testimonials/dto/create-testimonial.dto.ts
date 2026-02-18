import { IsString, IsOptional, IsInt, Min, Max, IsBoolean, IsIn, IsUUID } from 'class-validator';

export class CreateTestimonialDto {
  @IsString()
  client_name: string;

  @IsOptional()
  @IsString()
  client_company?: string;

  @IsOptional()
  @IsString()
  client_role?: string;

  @IsOptional()
  @IsString()
  client_photo_url?: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  rating?: number;

  @IsOptional()
  @IsUUID()
  project_id?: string;

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
