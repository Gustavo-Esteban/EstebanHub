import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="settings-page">
      <div class="header">
        <h1>Configurações</h1>
        <p>Gerencie as informações gerais do seu site</p>
      </div>

      <div class="loading" *ngIf="loading">
        <div class="spinner"></div>
        <p>Carregando configurações...</p>
      </div>

      <form [formGroup]="settingsForm" (ngSubmit)="onSubmit()" *ngIf="!loading">
        <!-- Company Info -->
        <div class="settings-section">
          <div class="section-header">
            <h2>🏢 Informações da Empresa</h2>
          </div>
          <div class="form-grid">
            <div class="form-group">
              <label>Nome da Empresa *</label>
              <input type="text" formControlName="company_name" placeholder="EstebanHub">
            </div>
            <div class="form-group">
              <label>Email de Contato *</label>
              <input type="email" formControlName="company_email" placeholder="contato@estebanhub.com">
            </div>
            <div class="form-group">
              <label>Telefone</label>
              <input type="tel" formControlName="company_phone" placeholder="(11) 97039-7086">
            </div>
            <div class="form-group">
              <label>WhatsApp</label>
              <input type="tel" formControlName="company_whatsapp" placeholder="5511970397086">
              <small>Formato internacional: 5511970397086</small>
            </div>
            <div class="form-group form-full">
              <label>Endereço</label>
              <input type="text" formControlName="company_address" placeholder="Cidade, Estado - Brasil">
            </div>
            <div class="form-group form-full">
              <label>Descrição da Empresa</label>
              <textarea formControlName="company_description" rows="3"
                placeholder="Breve descrição da empresa para o site..."></textarea>
            </div>
            <div class="form-group form-full">
              <label>URL do Logo</label>
              <input type="url" formControlName="company_logo_url" placeholder="https://exemplo.com/logo.png">
              <div class="logo-preview" *ngIf="settingsForm.get('company_logo_url')?.value">
                <img [src]="settingsForm.get('company_logo_url')?.value" alt="Logo preview">
              </div>
            </div>
          </div>
        </div>

        <!-- Social Media -->
        <div class="settings-section">
          <div class="section-header">
            <h2>📱 Redes Sociais</h2>
          </div>
          <div class="form-grid">
            <div class="form-group">
              <label>Instagram</label>
              <input type="url" formControlName="social_instagram" placeholder="https://instagram.com/estebanhub">
            </div>
            <div class="form-group">
              <label>LinkedIn</label>
              <input type="url" formControlName="social_linkedin" placeholder="https://linkedin.com/company/estebanhub">
            </div>
            <div class="form-group">
              <label>Facebook</label>
              <input type="url" formControlName="social_facebook" placeholder="https://facebook.com/estebanhub">
            </div>
            <div class="form-group">
              <label>GitHub</label>
              <input type="url" formControlName="social_github" placeholder="https://github.com/estebanhub">
            </div>
            <div class="form-group">
              <label>Twitter / X</label>
              <input type="url" formControlName="social_twitter" placeholder="https://twitter.com/estebanhub">
            </div>
          </div>
        </div>

        <!-- SEO -->
        <div class="settings-section">
          <div class="section-header">
            <h2>🔍 SEO & Analytics</h2>
          </div>
          <div class="form-grid">
            <div class="form-group form-full">
              <label>Meta Title</label>
              <input type="text" formControlName="meta_title" placeholder="EstebanHub - Criação de Sites e Landing Pages">
              <small>Título que aparece nas buscas (máx. 60 caracteres)</small>
              <div class="char-count" [class.over]="(settingsForm.get('meta_title')?.value?.length || 0) > 60">
                {{ settingsForm.get('meta_title')?.value?.length || 0 }}/60
              </div>
            </div>
            <div class="form-group form-full">
              <label>Meta Description</label>
              <textarea formControlName="meta_description" rows="2"
                placeholder="Sites e landing pages profissionais..."></textarea>
              <small>Descrição que aparece nas buscas (máx. 160 caracteres)</small>
              <div class="char-count" [class.over]="(settingsForm.get('meta_description')?.value?.length || 0) > 160">
                {{ settingsForm.get('meta_description')?.value?.length || 0 }}/160
              </div>
            </div>
            <div class="form-group form-full">
              <label>Palavras-chave</label>
              <input type="text" formControlName="meta_keywords"
                placeholder="criação de sites, landing pages, desenvolvimento web...">
            </div>
            <div class="form-group">
              <label>Google Analytics ID</label>
              <input type="text" formControlName="google_analytics_id" placeholder="G-XXXXXXXXXX">
            </div>
          </div>
        </div>

        <!-- Email Notifications -->
        <div class="settings-section">
          <div class="section-header">
            <h2>📧 Notificações por Email</h2>
          </div>
          <div class="form-grid">
            <div class="form-group">
              <label class="checkbox-label">
                <input type="checkbox" formControlName="email_notifications_enabled">
                <span>Habilitar notificações de novos leads</span>
              </label>
            </div>
            <div class="form-group">
              <label>Email para Notificações</label>
              <input type="email" formControlName="notification_email"
                placeholder="seu-email@gmail.com">
              <small>Onde receber emails de novos leads</small>
            </div>
          </div>
        </div>

        <div class="form-actions">
          <button type="submit" class="btn-primary" [disabled]="settingsForm.invalid || saving">
            {{ saving ? 'Salvando...' : 'Salvar Configurações' }}
          </button>
        </div>

        <div class="success-message" *ngIf="savedSuccess">
          ✅ Configurações salvas com sucesso!
        </div>

        <div class="error-message" *ngIf="errorMessage">
          {{ errorMessage }}
        </div>
      </form>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }

    .settings-page { padding: 40px; max-width: 1000px; margin: 0 auto; }
    .header { margin-bottom: 40px; }
    .header h1 { margin: 0 0 8px; font-size: 32px; color: #1a1a1a; }
    .header p { color: #6b7280; margin: 0; }
    .loading { text-align: center; padding: 60px 20px; }
    .spinner { width: 50px; height: 50px; border: 4px solid #f3f3f3; border-top: 4px solid #6366f1; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 20px; }
    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    .settings-section { background: white; border-radius: 12px; padding: 30px; margin-bottom: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
    .section-header h2 { margin: 0 0 24px; font-size: 20px; color: #1a1a1a; }
    .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
    .form-group { display: flex; flex-direction: column; gap: 8px; }
    .form-full { grid-column: 1 / -1; }
    label { font-weight: 600; color: #374151; font-size: 14px; }
    input, select, textarea { padding: 12px 16px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 15px; font-family: inherit; }
    input:focus, select:focus, textarea:focus { outline: none; border-color: #6366f1; }
    small { color: #6b7280; font-size: 13px; }
    .char-count { font-size: 12px; color: #9ca3af; text-align: right; }
    .char-count.over { color: #ef4444; }
    .checkbox-label { display: flex; align-items: center; gap: 10px; cursor: pointer; font-weight: normal; }
    .checkbox-label input { width: 20px; height: 20px; }
    .logo-preview { margin-top: 12px; max-width: 200px; }
    .logo-preview img { max-width: 100%; height: auto; border-radius: 8px; }
    .form-actions { text-align: right; }
    .btn-primary { padding: 14px 40px; background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 16px; font-weight: 600; }
    .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }
    .success-message { margin-top: 20px; padding: 14px; background: #d1fae5; color: #065f46; border-radius: 8px; text-align: center; font-weight: 600; }
    .error-message { margin-top: 20px; padding: 14px; background: #fef2f2; color: #ef4444; border-radius: 8px; text-align: center; }
    @media (max-width: 768px) { .form-grid { grid-template-columns: 1fr; } .form-full { grid-column: 1; } }
  `]
})
export class SettingsComponent implements OnInit {
  settingsForm: FormGroup;
  loading = false;
  saving = false;
  savedSuccess = false;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private api: ApiService) {
    this.settingsForm = this.fb.group({
      company_name: ['', Validators.required],
      company_email: ['', [Validators.required, Validators.email]],
      company_phone: [''],
      company_whatsapp: [''],
      company_address: [''],
      company_description: [''],
      company_logo_url: [''],
      social_instagram: [''],
      social_linkedin: [''],
      social_facebook: [''],
      social_github: [''],
      social_twitter: [''],
      meta_title: [''],
      meta_description: [''],
      meta_keywords: [''],
      google_analytics_id: [''],
      email_notifications_enabled: [true],
      notification_email: ['']
    });
  }

  ngOnInit() { this.loadSettings(); }

  async loadSettings() {
    this.loading = true;
    try {
      const settings = await firstValueFrom(this.api.get<any>('settings'));
      if (settings) {
        this.settingsForm.patchValue(settings);
      }
    } catch (err) {
      // Settings may not exist yet - that's okay
    } finally {
      this.loading = false;
    }
  }

  async onSubmit() {
    if (this.settingsForm.invalid) return;

    this.saving = true;
    this.errorMessage = null;
    this.savedSuccess = false;

    try {
      await firstValueFrom(this.api.put('settings', this.settingsForm.value));
      this.savedSuccess = true;
      setTimeout(() => { this.savedSuccess = false; }, 4000);
    } catch (err: any) {
      this.errorMessage = err.message || 'Erro ao salvar configurações';
    } finally {
      this.saving = false;
    }
  }
}
