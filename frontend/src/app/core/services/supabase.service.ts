import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseAnonKey
    );
  }

  get client(): SupabaseClient {
    return this.supabase;
  }

  // Auth methods
  async signIn(email: string, password: string) {
    return this.supabase.auth.signInWithPassword({ email, password });
  }

  async signOut() {
    return this.supabase.auth.signOut();
  }

  async getSession() {
    return this.supabase.auth.getSession();
  }

  async getUser(): Promise<User | null> {
    const { data } = await this.supabase.auth.getUser();
    return data.user;
  }

  onAuthStateChange(callback: (user: User | null) => void) {
    return this.supabase.auth.onAuthStateChange((_event, session) => {
      callback(session?.user ?? null);
    });
  }

  // Database methods (query builder)
  from(table: string) {
    return this.supabase.from(table);
  }

  // Storage methods
  storage() {
    return this.supabase.storage;
  }

  uploadFile(bucket: string, path: string, file: File) {
    return this.supabase.storage.from(bucket).upload(path, file, {
      upsert: false,
    });
  }

  getPublicUrl(bucket: string, path: string) {
    return this.supabase.storage.from(bucket).getPublicUrl(path);
  }

  deleteFile(bucket: string, path: string) {
    return this.supabase.storage.from(bucket).remove([path]);
  }
}
