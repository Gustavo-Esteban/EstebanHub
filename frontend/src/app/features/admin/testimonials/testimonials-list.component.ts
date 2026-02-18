import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-testimonials-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="testimonials-list">
      <div class="header">
        <h1>Depoimentos</h1>
        <button class="btn-primary" [routerLink]="['new']">
          <span>+</span> Novo Depoimento
        </button>
      </div>

      <div class="loading" *ngIf="loading">
        <div class="spinner"></div>
        <p>Carregando depoimentos...</p>
      </div>

      <div class="error" *ngIf="error">
        <p>{{ error }}</p>
        <button (click)="loadTestimonials()">Tentar novamente</button>
      </div>

      <div class="grid" *ngIf="!loading && !error">
        <div class="testimonial-card" *ngFor="let t of testimonials">
          <div class="card-header">
            <div class="client-info">
              <div class="avatar">
                <img *ngIf="t.client_photo_url" [src]="t.client_photo_url" [alt]="t.client_name">
                <span *ngIf="!t.client_photo_url">{{ t.client_name[0] }}</span>
              </div>
              <div>
                <strong>{{ t.client_name }}</strong>
                <small>{{ t.client_company || '' }}{{ t.client_role ? ' · ' + t.client_role : '' }}</small>
              </div>
            </div>
            <div class="status-section">
              <span class="status status-{{ t.status }}">{{ getStatusLabel(t.status) }}</span>
              <span class="featured-star" *ngIf="t.featured">⭐</span>
            </div>
          </div>

          <div class="rating">
            <span *ngFor="let star of [1,2,3,4,5]" class="star" [class.active]="star <= t.rating">★</span>
          </div>

          <p class="content">"{{ t.content }}"</p>

          <div class="card-footer">
            <small>{{ formatDate(t.created_at) }}</small>
            <div class="actions">
              <button class="btn-icon" [routerLink]="['edit', t.id]" title="Editar">✏️</button>
              <button class="btn-icon" (click)="confirmDelete(t)" title="Excluir">🗑️</button>
            </div>
          </div>
        </div>

        <div class="empty-state" *ngIf="testimonials.length === 0">
          <div class="icon">💬</div>
          <h3>Nenhum depoimento ainda</h3>
          <p>Adicione depoimentos dos seus clientes</p>
          <button class="btn-primary" [routerLink]="['new']">Adicionar Depoimento</button>
        </div>
      </div>

      <!-- Delete Modal -->
      <div class="modal" *ngIf="testimonialToDelete" (click)="cancelDelete()">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <h3>Confirmar Exclusão</h3>
          <p>Excluir o depoimento de <strong>{{ testimonialToDelete.client_name }}</strong>?</p>
          <div class="modal-actions">
            <button class="btn-secondary" (click)="cancelDelete()">Cancelar</button>
            <button class="btn-danger" (click)="deleteTestimonial()" [disabled]="deleting">
              {{ deleting ? 'Excluindo...' : 'Excluir' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .testimonials-list { padding: 40px; max-width: 1200px; margin: 0 auto; }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; }
    .header h1 { margin: 0; font-size: 32px; color: #1a1a1a; }
    .btn-primary { padding: 12px 24px; background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 16px; font-weight: 600; display: flex; align-items: center; gap: 8px; }
    .loading, .error { text-align: center; padding: 60px 20px; }
    .spinner { width: 50px; height: 50px; border: 4px solid #f3f3f3; border-top: 4px solid #6366f1; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 20px; }
    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(360px, 1fr)); gap: 24px; }
    .testimonial-card { background: white; border-radius: 12px; padding: 24px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); }
    .card-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 16px; }
    .client-info { display: flex; align-items: center; gap: 12px; }
    .avatar { width: 50px; height: 50px; border-radius: 50%; overflow: hidden; background: #6366f1; color: white; display: flex; align-items: center; justify-content: center; font-size: 20px; font-weight: 700; flex-shrink: 0; }
    .avatar img { width: 100%; height: 100%; object-fit: cover; }
    .client-info > div { display: flex; flex-direction: column; gap: 2px; }
    .client-info strong { color: #1a1a1a; font-size: 15px; }
    .client-info small { color: #6b7280; font-size: 13px; }
    .status-section { display: flex; flex-direction: column; align-items: flex-end; gap: 6px; }
    .status { padding: 4px 10px; border-radius: 10px; font-size: 12px; font-weight: 600; }
    .status-published { background: #d1fae5; color: #065f46; }
    .status-draft { background: #fef3c7; color: #92400e; }
    .status-archived { background: #f3f4f6; color: #6b7280; }
    .rating { margin-bottom: 12px; }
    .star { font-size: 18px; color: #d1d5db; }
    .star.active { color: #fbbf24; }
    .content { color: #374151; font-size: 14px; line-height: 1.6; font-style: italic; margin-bottom: 16px; }
    .card-footer { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #f3f4f6; padding-top: 12px; }
    .card-footer small { color: #9ca3af; font-size: 13px; }
    .actions { display: flex; gap: 6px; }
    .btn-icon { padding: 6px 10px; border: 1px solid #e5e7eb; background: white; border-radius: 6px; cursor: pointer; font-size: 15px; }
    .empty-state { grid-column: 1 / -1; text-align: center; padding: 60px 20px; }
    .empty-state .icon { font-size: 64px; margin-bottom: 20px; }
    .empty-state h3 { margin-bottom: 10px; }
    .empty-state p { color: #6b7280; margin-bottom: 20px; }
    .modal { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
    .modal-content { background: white; padding: 30px; border-radius: 12px; max-width: 450px; width: 90%; }
    .modal-content h3 { margin: 0 0 15px; }
    .modal-content p { color: #6b7280; }
    .modal-actions { display: flex; gap: 10px; justify-content: flex-end; margin-top: 20px; }
    .btn-secondary { padding: 10px 20px; background: #f3f4f6; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; }
    .btn-danger { padding: 10px 20px; background: #ef4444; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; }
    .btn-danger:disabled { opacity: 0.6; cursor: not-allowed; }
  `]
})
export class TestimonialsListComponent implements OnInit {
  testimonials: any[] = [];
  loading = false;
  error: string | null = null;
  testimonialToDelete: any = null;
  deleting = false;

  constructor(private api: ApiService) {}

  ngOnInit() { this.loadTestimonials(); }

  async loadTestimonials() {
    this.loading = true;
    this.error = null;
    try {
      this.testimonials = await firstValueFrom(this.api.get<any[]>('testimonials'));
    } catch (err: any) {
      this.error = err.message || 'Erro ao carregar depoimentos';
    } finally {
      this.loading = false;
    }
  }

  getStatusLabel(status: string) {
    return { 'published': 'Publicado', 'draft': 'Rascunho', 'archived': 'Arquivado' }[status] || status;
  }

  formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' });
  }

  confirmDelete(t: any) { this.testimonialToDelete = t; }
  cancelDelete() { this.testimonialToDelete = null; }

  async deleteTestimonial() {
    if (!this.testimonialToDelete) return;
    this.deleting = true;
    try {
      await firstValueFrom(this.api.delete(`testimonials/${this.testimonialToDelete.id}`));
      this.testimonials = this.testimonials.filter(t => t.id !== this.testimonialToDelete!.id);
      this.testimonialToDelete = null;
    } catch (err: any) {
      alert('Erro ao excluir: ' + err.message);
    } finally {
      this.deleting = false;
    }
  }
}
