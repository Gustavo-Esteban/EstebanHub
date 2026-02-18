import {
  Injectable,
  Inject,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_CLIENT } from '../../config/supabase.config';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { EmailService } from '../email/email.service';

@Injectable()
export class LeadsService {
  constructor(
    @Inject(SUPABASE_CLIENT) private supabase: SupabaseClient,
    private emailService: EmailService,
  ) {}

  async findAll(status?: string) {
    let query = this.supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    return data;
  }

  async findOne(id: string) {
    const { data, error } = await this.supabase
      .from('leads')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      throw new NotFoundException(`Lead with ID ${id} not found`);
    }

    return data;
  }

  async create(createLeadDto: CreateLeadDto) {
    const { data, error } = await this.supabase
      .from('leads')
      .insert(createLeadDto)
      .select()
      .single();

    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    // Enviar notificação por email (não bloqueia se falhar)
    await this.emailService.sendLeadNotification(data);

    return data;
  }

  async update(id: string, updateLeadDto: UpdateLeadDto) {
    const { data, error } = await this.supabase
      .from('leads')
      .update(updateLeadDto)
      .eq('id', id)
      .select()
      .single();

    if (error || !data) {
      throw new NotFoundException(`Lead with ID ${id} not found`);
    }

    return data;
  }

  async remove(id: string) {
    const { data, error } = await this.supabase
      .from('leads')
      .delete()
      .eq('id', id)
      .select()
      .single();

    if (error || !data) {
      throw new NotFoundException(`Lead with ID ${id} not found`);
    }

    return { message: 'Lead deleted successfully', data };
  }
}
