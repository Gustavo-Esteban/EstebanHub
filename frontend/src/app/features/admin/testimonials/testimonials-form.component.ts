import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-testimonials-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="form-page">
      <div class="header">
        <button class="btn-back" [routerLink]="['/admin/depoimentos']">← Voltar</button>
        <h1>{{ isEditMode ? 'Editar Depoimento' : 'Novo Depoimento' }}</h1>
      </div>

      <form [formGroup]="form" (ngSubmit)="onSubmit()" class="form-card">
        <div class="form-grid">
          <div class="form-group">
            <label>Nome do Cliente *</label>
            <input type="text" formControlName="client_name" placeholder="João Silva">
            <div class="error" *ngIf="form.get('client_name')?.invalid && form.get('client_name')?.touched">
              Obrigatório
            </div>
          </div>

          <div class="form-group">
            <label>Empresa</label>
            <input type="text" formControlName="client_company" placeholder="Empresa ABC Ltda">
          </div>

          <div class="form-group">
            <label>Cargo</label>
            <input type="text" formControlName="client_role" placeholder="CEO, Fundador...">
          </div>

          <div class="form-group">
            <label>URL da Foto</label>
            <input type="url" formControlName="client_photo_url" placeholder="https://exemplo.com/foto.jpg">
            <div class="avatar-preview" *ngIf="form.get('client_photo_url')?.value">
              <img [src]="form.get('client_photo_url')?.value" alt="Preview">
            </div>
          </div>

          <div class="form-group">
            <label>Avaliação *</label>
            <div class="star-input">
              <span
                *ngFor="let star of [1,2,3,4,5]"
                class="star"
                [class.active]="star <= (form.get('rating')?.value || 0)"
                (click)="setRating(star)">
                ★
              </span>
              <span class="rating-text">{{ form.get('rating')?.value || 0 }}/5</span>
            </div>
          </div>

          <div class="form-group">
            <label>Status</label>
            <select formControlName="status">
              <option value="draft">Rascunho</option>
              <option value="published">Publicado</option>
              <option value="archived">Arquivado</option>
            </select>
          </div>

          <div class="form-group form-full">
            <label>Depoimento *</label>
            <textarea formControlName="content" rows="5"
              placeholder="Escreva aqui o depoimento do cliente..."></textarea>
            <div class="error" *ngIf="form.get('content')?.invalid && form.get('content')?.touched">
              Obrigatório
            </div>
          </div>

          <div class="form-group form-full">
            <label class="checkbox-label">
              <input type="checkbox" formControlName="featured">
              <span>Depoimento em Destaque</span>
            </label>
          </div>
        </div>

        <div class="form-actions">
          <button type="button" class="btn-secondary" [routerLink]="['/admin/depoimentos']">Cancelar</button>
          <button type="submit" class="btn-primary" [disabled]="form.invalid || saving">
            {{ saving ? 'Salvando...' : (isEditMode ? 'Atualizar' : 'Criar') }}
          </button>
        </div>

        <div class="error-message" *ngIf="errorMessage">{{ errorMessage }}</div>
      </form>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }

    .form-page { padding: 40px; max-width: 900px; margin: 0 auto; }
    .header { margin-bottom: 30px; }
    .btn-back { background: none; border: none; color: #6366f1; font-size: 16px; cursor: pointer; padding: 0 0 12px; display: block; }
    .header h1 { margin: 0; font-size: 32px; color: #1a1a1a; }
    .form-card { background: white; border-radius: 12px; padding: 40px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 30px; }
    .form-group { display: flex; flex-direction: column; gap: 8px; }
    .form-full { grid-column: 1 / -1; }
    label { font-weight: 600; color: #374151; font-size: 14px; }
    input, select, textarea { padding: 12px 16px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 15px; font-family: inherit; }
    input:focus, select:focus, textarea:focus { outline: none; border-color: #6366f1; }
    .error { color: #ef4444; font-size: 13px; }
    .avatar-preview { width: 80px; height: 80px; border-radius: 50%; overflow: hidden; margin-top: 8px; }
    .avatar-preview img { width: 100%; height: 100%; object-fit: cover; }
    .star-input { display: flex; align-items: center; gap: 8px; }
    .star { font-size: 32px; cursor: pointer; color: #d1d5db; transition: color 0.2s; }
    .star.active { color: #fbbf24; }
    .star:hover { color: #fbbf24; }
    .rating-text { font-size: 14px; color: #6b7280; margin-left: 8px; }
    .checkbox-label { display: flex; align-items: center; gap: 10px; cursor: pointer; font-weight: normal; }
    .checkbox-label input { width: 20px; height: 20px; }
    .form-actions { display: flex; gap: 12px; justify-content: flex-end; border-top: 1px solid #e5e7eb; padding-top: 20px; }
    .btn-primary { padding: 12px 32px; background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 16px; font-weight: 600; }
    .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }
    .btn-secondary { padding: 12px 32px; background: #f3f4f6; border: none; border-radius: 8px; cursor: pointer; font-size: 16px; font-weight: 600; }
    .error-message { margin-top: 20px; padding: 12px; background: #fef2f2; color: #ef4444; border-radius: 8px; text-align: center; }
  `]
})
export class TestimonialsFormComponent implements OnInit {
  form: FormGroup;
  isEditMode = false;
  testimonialId: string | null = null;
  saving = false;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.fb.group({
      client_name: ['', Validators.required],
      client_company: [''],
      client_role: [''],
      client_photo_url: [''],
      content: ['', Validators.required],
      rating: [5],
      status: ['draft'],
      featured: [false],
      order_index: [0]
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.testimonialId = params.get('id');
      this.isEditMode = !!this.testimonialId && this.testimonialId !== 'new';
      if (this.isEditMode) this.loadTestimonial();
    });
  }

  async loadTestimonial() {
    try {
      const t = await firstValueFrom(this.api.get<any>(`testimonials/${this.testimonialId}`));
      this.form.patchValue(t);
    } catch (err: any) {
      this.errorMessage = err.message;
    }
  }

  setRating(value: number) {
    this.form.patchValue({ rating: value });
  }

  async onSubmit() {
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach(k => this.form.get(k)?.markAsTouched());
      return;
    }

    this.saving = true;
    this.errorMessage = null;

    try {
      if (this.isEditMode) {
        await firstValueFrom(this.api.put(`testimonials/${this.testimonialId}`, this.form.value));
      } else {
        await firstValueFrom(this.api.post('testimonials', this.form.value));
      }
      this.router.navigate(['/admin/depoimentos']);
    } catch (err: any) {
      this.errorMessage = err.message || 'Erro ao salvar';
    } finally {
      this.saving = false;
    }
  }
}
