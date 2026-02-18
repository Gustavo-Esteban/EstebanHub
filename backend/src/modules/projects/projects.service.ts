import {
  Injectable,
  Inject,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_CLIENT } from '../../config/supabase.config';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @Inject(SUPABASE_CLIENT) private supabase: SupabaseClient,
  ) {}

  async findAll(status?: string) {
    let query = this.supabase
      .from('projects')
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
      .from('projects')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    return data;
  }

  async findBySlug(slug: string) {
    const { data, error } = await this.supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error || !data) {
      throw new NotFoundException(`Project with slug ${slug} not found`);
    }

    return data;
  }

  async create(createProjectDto: CreateProjectDto) {
    const { data, error } = await this.supabase
      .from('projects')
      .insert(createProjectDto)
      .select()
      .single();

    if (error) {
      throw new InternalServerErrorException(error.message);
    }

    return data;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    const { data, error } = await this.supabase
      .from('projects')
      .update(updateProjectDto)
      .eq('id', id)
      .select()
      .single();

    if (error || !data) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    return data;
  }

  async remove(id: string) {
    const { data, error } = await this.supabase
      .from('projects')
      .delete()
      .eq('id', id)
      .select()
      .single();

    if (error || !data) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    return { message: 'Project deleted successfully', data };
  }
}
