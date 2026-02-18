import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_CLIENT } from '../../config/supabase.config';

@Injectable()
export class AuthService {
  constructor(
    @Inject(SUPABASE_CLIENT) private supabase: SupabaseClient,
  ) {}

  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      throw new UnauthorizedException(error.message);
    }

    return {
      access_token: data.session.access_token,
      refresh_token: data.session.refresh_token,
      user: {
        id: data.user.id,
        email: data.user.email,
        created_at: data.user.created_at,
      },
    };
  }

  async signOut(token: string) {
    // Supabase handle signOut com o token
    const { error } = await this.supabase.auth.admin.signOut(token);

    if (error) {
      throw new UnauthorizedException(error.message);
    }

    return { message: 'Successfully signed out' };
  }

  async validateToken(token: string) {
    const { data, error } = await this.supabase.auth.getUser(token);

    if (error || !data.user) {
      throw new UnauthorizedException('Invalid token');
    }

    return data.user;
  }

  async getMe(token: string) {
    const user = await this.validateToken(token);

    return {
      id: user.id,
      email: user.email,
      created_at: user.created_at,
    };
  }
}
