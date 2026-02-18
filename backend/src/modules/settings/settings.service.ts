import {
  Injectable,
  Inject,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_CLIENT } from '../../config/supabase.config';
import { UpdateSettingsDto } from './dto/update-settings.dto';

@Injectable()
export class SettingsService {
  constructor(
    @Inject(SUPABASE_CLIENT) private supabase: SupabaseClient,
  ) {}

  async get() {
    const { data, error } = await this.supabase
      .from('settings')
      .select('*')
      .limit(1)
      .single();

    if (error || !data) {
      throw new NotFoundException('Settings not found');
    }

    return data;
  }

  async update(updateSettingsDto: UpdateSettingsDto) {
    // Get first (and only) settings record
    const { data: existingSettings } = await this.supabase
      .from('settings')
      .select('id')
      .limit(1)
      .single();

    if (!existingSettings) {
      throw new NotFoundException('Settings not found');
    }

    const { data, error } = await this.supabase
      .from('settings')
      .update(updateSettingsDto)
      .eq('id', existingSettings.id)
      .select()
      .single();

    if (error || !data) {
      throw new InternalServerErrorException('Failed to update settings');
    }

    return data;
  }
}
