import {
  Injectable,
  Inject,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_CLIENT } from '../../config/supabase.config';
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {
  constructor(
    @Inject(SUPABASE_CLIENT) private supabase: SupabaseClient,
  ) {}

  async findAll(status?: string) {
    let query = this.supabase
      .from('services')
      .select('*')
      .order('order_index', { ascending: true });

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
      .from('services')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }

    return data;
  }

  async findBySlug(slug: string) {
    const { data, error } = await this.supabase
      .from('services')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !data) {
      throw new NotFoundException(`Service with slug ${slug} not found`);
    }

    return data;
  }

  async create(createServiceDto: CreateServiceDto) {
    const { data, error } = await this.supabase
      .from('services')
      .insert(createServiceDto)
      .select()
      .single();

    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    return data;
  }

  async update(id: string, updateServiceDto: UpdateServiceDto) {
    const { data, error } = await this.supabase
      .from('services')
      .update(updateServiceDto)
      .eq('id', id)
      .select()
      .single();

    if (error || !data) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }

    return data;
  }

  async remove(id: string) {
    const { data, error } = await this.supabase
      .from('services')
      .delete()
      .eq('id', id)
      .select()
      .single();

    if (error || !data) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }

    return { message: 'Service deleted successfully', data };
  }
}
