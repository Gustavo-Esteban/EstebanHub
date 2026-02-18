import { IsOptional, IsString, IsBoolean } from 'class-validator';

export class UpdateSettingsDto {
  @IsOptional()
  @IsString()
  company_name?: string;

  @IsOptional()
  @IsString()
  company_email?: string;

  @IsOptional()
  @IsString()
  company_phone?: string;

  @IsOptional()
  @IsString()
  company_whatsapp?: string;

  @IsOptional()
  @IsString()
  company_address?: string;

  @IsOptional()
  @IsString()
  company_logo_url?: string;

  @IsOptional()
  @IsString()
  company_description?: string;

  @IsOptional()
  @IsString()
  social_facebook?: string;

  @IsOptional()
  @IsString()
  social_instagram?: string;

  @IsOptional()
  @IsString()
  social_linkedin?: string;

  @IsOptional()
  @IsString()
  social_github?: string;

  @IsOptional()
  @IsString()
  social_twitter?: string;

  @IsOptional()
  @IsString()
  meta_title?: string;

  @IsOptional()
  @IsString()
  meta_description?: string;

  @IsOptional()
  @IsString()
  meta_keywords?: string;

  @IsOptional()
  @IsString()
  google_analytics_id?: string;

  @IsOptional()
  @IsBoolean()
  email_notifications_enabled?: boolean;

  @IsOptional()
  @IsString()
  notification_email?: string;
}
