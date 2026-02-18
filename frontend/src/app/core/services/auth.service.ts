import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '@supabase/supabase-js';
import { SupabaseService } from './supabase.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$: Observable<User | null> = this.currentUserSubject.asObservable();
  private tokenSubject = new BehaviorSubject<string | null>(null);

  constructor(private supabase: SupabaseService) {
    this.loadSession();
  }

  private async loadSession() {
    const { data } = await this.supabase.getSession();
    if (data.session) {
      this.currentUserSubject.next(data.session.user);
      this.tokenSubject.next(data.session.access_token);
    }

    // Listen to auth state changes
    this.supabase.onAuthStateChange((user) => {
      this.currentUserSubject.next(user);
    });
  }

  async login(email: string, password: string): Promise<void> {
    const { data, error } = await this.supabase.signIn(email, password);

    if (error) {
      throw error;
    }

    if (data.session) {
      this.currentUserSubject.next(data.user);
      this.tokenSubject.next(data.session.access_token);
    }
  }

  async logout(): Promise<void> {
    await this.supabase.signOut();
    this.currentUserSubject.next(null);
    this.tokenSubject.next(null);
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }
}
