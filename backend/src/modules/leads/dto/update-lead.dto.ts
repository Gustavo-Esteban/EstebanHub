import { IsOptional, IsString, IsIn } from 'class-validator';

export class UpdateLeadDto {
  @IsOptional()
  @IsIn(['new', 'contacted', 'qualified', 'converted', 'archived'])
  status?: string;

  @IsOptional()
  @IsString()
  notes?: string;

  @IsOptional()
  @IsString()
  contacted_at?: string;
}
