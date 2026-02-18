import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../../../core/services/api.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-leads-list',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="leads-list">
      <div class="header">
        <h1>Leads</h1>
        <div class="header-stats">
          <div class="stat-pill new">{{ getCountByStatus('new') }} Novos</div>
          <div class="stat-pill contacted">{{ getCountByStatus('contacted') }} Contatados</div>
          <div class="stat-pill qualified">{{ getCountByStatus('qualified') }} Qualificados</div>
          <div class="stat-pill converted">{{ getCountByStatus('converted') }} Convertidos</div>
        </div>
      </div>

      <div class="filters">
        <button class="filter-btn" [class.active]="activeFilter === 'all'" (click)="setFilter('all')">
          Todos ({{ leads.length }})
        </button>
        <button class="filter-btn" [class.active]="activeFilter === 'new'" (click)="setFilter('new')">
          Novos
        </button>
        <button class="filter-btn" [class.active]="activeFilter === 'contacted'" (click)="setFilter('contacted')">
          Contatados
        </button>
        <button class="filter-btn" [class.active]="activeFilter === 'qualified'" (click)="setFilter('qualified')">
          Qualificados
        </button>
        <button class="filter-btn" [class.active]="activeFilter === 'converted'" (click)="setFilter('converted')">
          Convertidos
        </button>
        <button class="filter-btn" [class.active]="activeFilter === 'archived'" (click)="setFilter('archived')">
          Arquivados
        </button>
      </div>

      <div class="loading" *ngIf="loading">
        <div class="spinner"></div>
        <p>Carregando leads...</p>
      </div>

      <div class="leads-grid" *ngIf="!loading">
        <div class="lead-card" *ngFor="let lead of filteredLeads" [class]="'lead-' + lead.status">
          <div class="lead-header">
            <div class="lead-identity">
              <div class="lead-avatar">{{ lead.name[0].toUpperCase() }}</div>
              <div>
                <strong>{{ lead.name }}</strong>
                <span class="lead-source">via {{ getSourceLabel(lead.source) }}</span>
              </div>
            </div>
            <div class="lead-status">
              <select
                [value]="lead.status"
                (change)="updateStatus(lead, $event)"
                class="status-select status-{{ lead.status }}">
                <option value="new">Novo</option>
                <option value="contacted">Contatado</option>
                <option value="qualified">Qualificado</option>
                <option value="converted">Convertido</option>
                <option value="archived">Arquivado</option>
              </select>
            </div>
          </div>

          <div class="lead-contact">
            <a [href]="'mailto:' + lead.email" class="contact-link">📧 {{ lead.email }}</a>
            <a *ngIf="lead.phone" [href]="'tel:' + lead.phone" class="contact-link">📞 {{ lead.phone }}</a>
            <span *ngIf="lead.company" class="company">🏢 {{ lead.company }}</span>
          </div>

          <div class="lead-message" *ngIf="lead.message">
            <p>{{ lead.message }}</p>
          </div>

          <div class="lead-notes">
            <div class="notes-header">
              <span>Anotações</span>
              <button class="btn-edit-notes" (click)="openNotesModal(lead)">✏️ Editar</button>
            </div>
            <p *ngIf="lead.notes" class="notes-text">{{ lead.notes }}</p>
            <p *ngIf="!lead.notes" class="no-notes">Nenhuma anotação</p>
          </div>

          <div class="lead-footer">
            <small>{{ formatDate(lead.created_at) }}</small>
            <button class="btn-archive" (click)="archiveLead(lead)" *ngIf="lead.status !== 'archived'">
              Arquivar
            </button>
          </div>
        </div>

        <div class="empty-state" *ngIf="filteredLeads.length === 0 && !loading">
          <div class="icon">📬</div>
          <h3>Nenhum lead aqui</h3>
          <p>Leads aparecerão aqui quando alguém enviar o formulário de contato</p>
        </div>
      </div>

      <!-- Notes Modal -->
      <div class="modal" *ngIf="selectedLead" (click)="closeNotesModal()">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <h3>Anotações - {{ selectedLead.name }}</h3>
          <form [formGroup]="notesForm" (ngSubmit)="saveNotes()">
            <textarea
              formControlName="notes"
              rows="6"
              placeholder="Adicione anotações sobre este lead..."
            ></textarea>
            <div class="modal-actions">
              <button type="button" class="btn-secondary" (click)="closeNotesModal()">Cancelar</button>
              <button type="submit" class="btn-primary" [disabled]="savingNotes">
                {{ savingNotes ? 'Salvando...' : 'Salvar' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }

    .leads-list { padding: 40px; max-width: 1400px; margin: 0 auto; }
    .header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 30px; flex-wrap: wrap; gap: 20px; }
    .header h1 { margin: 0; font-size: 32px; color: #1a1a1a; }
    .header-stats { display: flex; gap: 12px; flex-wrap: wrap; }
    .stat-pill { padding: 8px 16px; border-radius: 20px; font-size: 14px; font-weight: 600; }
    .stat-pill.new { background: #dbeafe; color: #1e40af; }
    .stat-pill.contacted { background: #fef3c7; color: #92400e; }
    .stat-pill.qualified { background: #e0e7ff; color: #3730a3; }
    .stat-pill.converted { background: #d1fae5; color: #065f46; }
    .filters { display: flex; gap: 10px; margin-bottom: 30px; flex-wrap: wrap; }
    .filter-btn { padding: 10px 20px; border: 1px solid #ddd; background: white; border-radius: 8px; cursor: pointer; font-size: 14px; transition: all 0.2s; }
    .filter-btn:hover, .filter-btn.active { background: #6366f1; color: white; border-color: #6366f1; }
    .loading { text-align: center; padding: 60px 20px; }
    .spinner { width: 50px; height: 50px; border: 4px solid #f3f3f3; border-top: 4px solid #6366f1; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 20px; }
    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    .leads-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(380px, 1fr)); gap: 24px; }
    .lead-card { background: white; border-radius: 12px; padding: 20px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); border-left: 4px solid #ddd; }
    .lead-new { border-left-color: #3b82f6; }
    .lead-contacted { border-left-color: #f59e0b; }
    .lead-qualified { border-left-color: #8b5cf6; }
    .lead-converted { border-left-color: #10b981; }
    .lead-archived { border-left-color: #9ca3af; opacity: 0.7; }
    .lead-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 14px; gap: 12px; }
    .lead-identity { display: flex; align-items: center; gap: 12px; }
    .lead-avatar { width: 44px; height: 44px; border-radius: 50%; background: linear-gradient(135deg, #667eea, #764ba2); color: white; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 18px; flex-shrink: 0; }
    .lead-identity > div { display: flex; flex-direction: column; gap: 2px; }
    .lead-identity strong { color: #1a1a1a; font-size: 16px; }
    .lead-source { font-size: 12px; color: #9ca3af; }
    .status-select { padding: 6px 10px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 13px; font-weight: 600; cursor: pointer; }
    .status-new { border-color: #93c5fd; color: #1e40af; background: #eff6ff; }
    .status-contacted { border-color: #fcd34d; color: #92400e; background: #fffbeb; }
    .status-qualified { border-color: #c4b5fd; color: #3730a3; background: #f5f3ff; }
    .status-converted { border-color: #6ee7b7; color: #065f46; background: #ecfdf5; }
    .status-archived { border-color: #d1d5db; color: #6b7280; background: #f9fafb; }
    .lead-contact { display: flex; flex-direction: column; gap: 6px; margin-bottom: 14px; padding-bottom: 14px; border-bottom: 1px solid #f3f4f6; }
    .contact-link { color: #6366f1; text-decoration: none; font-size: 14px; }
    .contact-link:hover { text-decoration: underline; }
    .company { font-size: 14px; color: #6b7280; }
    .lead-message { margin-bottom: 14px; padding-bottom: 14px; border-bottom: 1px solid #f3f4f6; }
    .lead-message p { font-size: 14px; color: #374151; line-height: 1.5; max-height: 80px; overflow: hidden; }
    .lead-notes { margin-bottom: 14px; }
    .notes-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; font-size: 13px; font-weight: 600; color: #6b7280; }
    .btn-edit-notes { background: none; border: none; cursor: pointer; font-size: 13px; color: #6366f1; padding: 0; }
    .notes-text { font-size: 13px; color: #374151; background: #f9fafb; padding: 10px; border-radius: 6px; }
    .no-notes { font-size: 13px; color: #9ca3af; font-style: italic; }
    .lead-footer { display: flex; justify-content: space-between; align-items: center; border-top: 1px solid #f3f4f6; padding-top: 12px; }
    .lead-footer small { color: #9ca3af; font-size: 13px; }
    .btn-archive { padding: 6px 14px; background: #f3f4f6; border: none; border-radius: 6px; cursor: pointer; font-size: 13px; color: #6b7280; }
    .empty-state { grid-column: 1 / -1; text-align: center; padding: 60px 20px; }
    .empty-state .icon { font-size: 64px; margin-bottom: 20px; }
    .empty-state h3 { margin-bottom: 10px; }
    .empty-state p { color: #6b7280; }
    .modal { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
    .modal-content { background: white; padding: 30px; border-radius: 12px; max-width: 500px; width: 90%; }
    .modal-content h3 { margin: 0 0 20px; }
    textarea { width: 100%; padding: 12px; border: 1px solid #d1d5db; border-radius: 8px; font-family: inherit; font-size: 15px; resize: vertical; box-sizing: border-box; }
    .modal-actions { display: flex; gap: 10px; justify-content: flex-end; margin-top: 20px; }
    .btn-primary { padding: 10px 24px; background: linear-gradient(135deg, #667eea, #764ba2); color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; }
    .btn-primary:disabled { opacity: 0.6; cursor: not-allowed; }
    .btn-secondary { padding: 10px 24px; background: #f3f4f6; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; }
  `]
})
export class LeadsListComponent implements OnInit {
  leads: any[] = [];
  filteredLeads: any[] = [];
  activeFilter = 'all';
  loading = false;
  selectedLead: any = null;
  notesForm: FormGroup;
  savingNotes = false;

  constructor(private api: ApiService, private fb: FormBuilder) {
    this.notesForm = this.fb.group({ notes: [''] });
  }

  ngOnInit() { this.loadLeads(); }

  async loadLeads() {
    this.loading = true;
    try {
      this.leads = await firstValueFrom(this.api.get<any[]>('leads'));
      this.applyFilter();
    } catch (err) {
      // leads may require auth - handled by interceptor
    } finally {
      this.loading = false;
    }
  }

  setFilter(filter: string) {
    this.activeFilter = filter;
    this.applyFilter();
  }

  applyFilter() {
    this.filteredLeads = this.activeFilter === 'all'
      ? this.leads
      : this.leads.filter(l => l.status === this.activeFilter);
  }

  getCountByStatus(status: string) {
    return this.leads.filter(l => l.status === status).length;
  }

  getSourceLabel(source: string) {
    return { 'contact-form': 'Formulário', 'whatsapp': 'WhatsApp', 'landing-page': 'Landing Page' }[source] || source;
  }

  formatDate(dateString: string) {
    return new Date(dateString).toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
  }

  async updateStatus(lead: any, event: Event) {
    const newStatus = (event.target as HTMLSelectElement).value;
    try {
      await firstValueFrom(this.api.put(`leads/${lead.id}`, { status: newStatus }));
      lead.status = newStatus;
      this.applyFilter();
    } catch (err: any) {
      alert('Erro ao atualizar status');
    }
  }

  async archiveLead(lead: any) {
    try {
      await firstValueFrom(this.api.put(`leads/${lead.id}`, { status: 'archived' }));
      lead.status = 'archived';
      this.applyFilter();
    } catch (err: any) {
      alert('Erro ao arquivar lead');
    }
  }

  openNotesModal(lead: any) {
    this.selectedLead = lead;
    this.notesForm.patchValue({ notes: lead.notes || '' });
  }

  closeNotesModal() {
    this.selectedLead = null;
  }

  async saveNotes() {
    if (!this.selectedLead) return;
    this.savingNotes = true;
    try {
      await firstValueFrom(this.api.put(`leads/${this.selectedLead.id}`, { notes: this.notesForm.value.notes }));
      this.selectedLead.notes = this.notesForm.value.notes;
      this.closeNotesModal();
    } catch (err: any) {
      alert('Erro ao salvar anotações');
    } finally {
      this.savingNotes = false;
    }
  }
}
