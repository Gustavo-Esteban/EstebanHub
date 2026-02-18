import { IsString, IsEmail, IsOptional, IsIn } from 'class-validator';

export class CreateLeadDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  company?: string;

  @IsOptional()
  @IsString()
  message?: string;

  @IsOptional()
  @IsIn(['contact-form', 'whatsapp', 'landing-page'])
  source?: string;
}
