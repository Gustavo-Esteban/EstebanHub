import {
  Injectable,
  Inject,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_CLIENT } from '../../config/supabase.config';
import { CreateTestimonialDto } from './dto/create-testimonial.dto';
import { UpdateTestimonialDto } from './dto/update-testimonial.dto';

@Injectable()
export class TestimonialsService {
  constructor(
    @Inject(SUPABASE_CLIENT) private supabase: SupabaseClient,
  ) {}

  async findAll(status?: string) {
    let query = this.supabase
      .from('testimonials')
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
      .from('testimonials')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      throw new NotFoundException(`Testimonial with ID ${id} not found`);
    }

    return data;
  }

  async create(createTestimonialDto: CreateTestimonialDto) {
    const { data, error } = await this.supabase
      .from('testimonials')
      .insert(createTestimonialDto)
      .select()
      .single();

    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    return data;
  }

  async update(id: string, updateTestimonialDto: UpdateTestimonialDto) {
    const { data, error } = await this.supabase
      .from('testimonials')
      .update(updateTestimonialDto)
      .eq('id', id)
      .select()
      .single();

    if (error || !data) {
      throw new NotFoundException(`Testimonial with ID ${id} not found`);
    }

    return data;
  }

  async remove(id: string) {
    const { data, error } = await this.supabase
      .from('testimonials')
      .delete()
      .eq('id', id)
      .select()
      .single();

    if (error || !data) {
      throw new NotFoundException(`Testimonial with ID ${id} not found`);
    }

    return { message: 'Testimonial deleted successfully', data };
  }
}
