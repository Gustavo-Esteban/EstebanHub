import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ProjectsService } from '../../../core/services/projects.service';

interface Project {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  category: string;
  status: 'draft' | 'published' | 'archived';
  featured: boolean;
  thumbnail_url?: string;
  created_at: string;
}

@Component({
  selector: 'app-project-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="project-list">
      <div class="header">
        <h1>Projetos</h1>
        <button class="btn-primary" [routerLink]="['new']">
          <span class="icon">+</span>
          Novo Projeto
        </button>
      </div>

      <div class="filters">
        <button
          class="filter-btn"
          [class.active]="filterStatus === 'all'"
          (click)="filterByStatus('all')">
          Todos ({{ getTotalByStatus('all') }})
        </button>
        <button
          class="filter-btn"
          [class.active]="filterStatus === 'published'"
          (click)="filterByStatus('published')">
          Publicados ({{ getTotalByStatus('published') }})
        </button>
        <button
          class="filter-btn"
          [class.active]="filterStatus === 'draft'"
          (click)="filterByStatus('draft')">
          Rascunhos ({{ getTotalByStatus('draft') }})
        </button>
        <button
          class="filter-btn"
          [class.active]="filterStatus === 'archived'"
          (click)="filterByStatus('archived')">
          Arquivados ({{ getTotalByStatus('archived') }})
        </button>
      </div>

      <div class="loading" *ngIf="loading">
        <div class="spinner"></div>
        <p>Carregando projetos...</p>
      </div>

      <div class="error" *ngIf="error">
        <p>{{ error }}</p>
        <button (click)="loadProjects()">Tentar novamente</button>
      </div>

      <div class="table-container" *ngIf="!loading && !error">
        <table *ngIf="filteredProjects.length > 0; else emptyState">
          <thead>
            <tr>
              <th>Imagem</th>
              <th>Título</th>
              <th>Categoria</th>
              <th>Status</th>
              <th>Destaque</th>
              <th>Data</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let project of filteredProjects">
              <td>
                <div class="thumbnail">
                  <img
                    *ngIf="project.thumbnail_url"
                    [src]="project.thumbnail_url"
                    [alt]="project.title"
                  >
                  <div *ngIf="!project.thumbnail_url" class="no-image">
                    <span>📷</span>
                  </div>
                </div>
              </td>
              <td>
                <div class="project-info">
                  <strong>{{ project.title }}</strong>
                  <small>{{ project.short_description }}</small>
                </div>
              </td>
              <td>
                <span class="badge badge-{{ project.category }}">
                  {{ getCategoryLabel(project.category) }}
                </span>
              </td>
              <td>
                <span class="status status-{{ project.status }}">
                  {{ getStatusLabel(project.status) }}
                </span>
              </td>
              <td>
                <span class="featured" *ngIf="project.featured">⭐</span>
                <span class="not-featured" *ngIf="!project.featured">-</span>
              </td>
              <td>
                <small>{{ formatDate(project.created_at) }}</small>
              </td>
              <td>
                <div class="actions">
                  <button
                    class="btn-icon"
                    [routerLink]="['edit', project.id]"
                    title="Editar">
                    ✏️
                  </button>
                  <button
                    class="btn-icon btn-danger"
                    (click)="confirmDelete(project)"
                    title="Excluir">
                    🗑️
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <ng-template #emptyState>
          <div class="empty-state">
            <div class="icon">📁</div>
            <h3>Nenhum projeto encontrado</h3>
            <p>Comece criando seu primeiro projeto</p>
            <button class="btn-primary" [routerLink]="['new']">
              Criar Projeto
            </button>
          </div>
        </ng-template>
      </div>

      <!-- Delete Confirmation Modal -->
      <div class="modal" *ngIf="projectToDelete" (click)="cancelDelete()">
        <div class="modal-content" (click)="$event.stopPropagation()">
          <h3>Confirmar Exclusão</h3>
          <p>Tem certeza que deseja excluir o projeto <strong>{{ projectToDelete.title }}</strong>?</p>
          <p class="warning">Esta ação não pode ser desfeita.</p>
          <div class="modal-actions">
            <button class="btn-secondary" (click)="cancelDelete()">Cancelar</button>
            <button class="btn-danger" (click)="deleteProject()" [disabled]="deleting">
              {{ deleting ? 'Excluindo...' : 'Excluir' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }

    .project-list {
      padding: 40px;
      max-width: 1400px;
      margin: 0 auto;
    }

    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 30px;
    }

    .header h1 {
      margin: 0;
      color: #1a1a1a;
      font-size: 32px;
    }

    .filters {
      display: flex;
      gap: 10px;
      margin-bottom: 30px;
      flex-wrap: wrap;
    }

    .filter-btn {
      padding: 10px 20px;
      border: 1px solid #ddd;
      background: white;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s;
      font-size: 14px;
    }

    .filter-btn:hover {
      border-color: #6366f1;
      color: #6366f1;
    }

    .filter-btn.active {
      background: #6366f1;
      color: white;
      border-color: #6366f1;
    }

    .btn-primary {
      padding: 12px 24px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-size: 16px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: transform 0.2s;
    }

    .btn-primary:hover {
      transform: translateY(-2px);
    }

    .btn-primary .icon {
      font-size: 20px;
    }

    .loading, .error {
      text-align: center;
      padding: 60px 20px;
    }

    .spinner {
      width: 50px;
      height: 50px;
      border: 4px solid #f3f3f3;
      border-top: 4px solid #6366f1;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin: 0 auto 20px;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .error {
      color: #ef4444;
    }

    .error button {
      margin-top: 10px;
      padding: 10px 20px;
      background: #ef4444;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
    }

    .table-container {
      background: white;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      overflow: hidden;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    thead {
      background: #f9fafb;
    }

    th {
      padding: 16px;
      text-align: left;
      font-weight: 600;
      color: #6b7280;
      font-size: 14px;
      border-bottom: 2px solid #e5e7eb;
    }

    td {
      padding: 16px;
      border-bottom: 1px solid #f3f4f6;
    }

    tbody tr:hover {
      background: #f9fafb;
    }

    .thumbnail {
      width: 80px;
      height: 60px;
      border-radius: 8px;
      overflow: hidden;
    }

    .thumbnail img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .no-image {
      width: 100%;
      height: 100%;
      background: #f3f4f6;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
    }

    .project-info {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .project-info strong {
      color: #1a1a1a;
      font-size: 15px;
    }

    .project-info small {
      color: #6b7280;
      font-size: 13px;
      max-width: 300px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }

    .badge {
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 600;
      display: inline-block;
    }

    .badge-institutional { background: #dbeafe; color: #1e40af; }
    .badge-ecommerce { background: #d1fae5; color: #065f46; }
    .badge-landing-page { background: #fce7f3; color: #9f1239; }

    .status {
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 600;
      display: inline-block;
    }

    .status-published { background: #d1fae5; color: #065f46; }
    .status-draft { background: #fef3c7; color: #92400e; }
    .status-archived { background: #f3f4f6; color: #6b7280; }

    .featured {
      font-size: 20px;
    }

    .not-featured {
      color: #d1d5db;
      font-size: 20px;
    }

    .actions {
      display: flex;
      gap: 8px;
    }

    .btn-icon {
      padding: 8px 12px;
      border: 1px solid #e5e7eb;
      background: white;
      border-radius: 6px;
      cursor: pointer;
      font-size: 16px;
      transition: all 0.2s;
    }

    .btn-icon:hover {
      background: #f9fafb;
      transform: scale(1.1);
    }

    .btn-icon.btn-danger:hover {
      background: #fef2f2;
      border-color: #fecaca;
    }

    .empty-state {
      padding: 80px 20px;
      text-align: center;
    }

    .empty-state .icon {
      font-size: 64px;
      margin-bottom: 20px;
    }

    .empty-state h3 {
      color: #1a1a1a;
      margin-bottom: 10px;
    }

    .empty-state p {
      color: #6b7280;
      margin-bottom: 30px;
    }

    /* Modal */
    .modal {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .modal-content {
      background: white;
      padding: 30px;
      border-radius: 12px;
      max-width: 500px;
      width: 90%;
    }

    .modal-content h3 {
      margin: 0 0 15px;
      color: #1a1a1a;
    }

    .modal-content p {
      color: #6b7280;
      margin-bottom: 10px;
    }

    .modal-content .warning {
      color: #ef4444;
      font-weight: 600;
      font-size: 14px;
    }

    .modal-actions {
      display: flex;
      gap: 10px;
      justify-content: flex-end;
      margin-top: 25px;
    }

    .btn-secondary {
      padding: 10px 20px;
      background: #f3f4f6;
      color: #1a1a1a;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
    }

    .btn-danger {
      padding: 10px 20px;
      background: #ef4444;
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
    }

    .btn-danger:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
  `]
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];
  filteredProjects: Project[] = [];
  filterStatus: string = 'all';
  loading = false;
  error: string | null = null;
  projectToDelete: Project | null = null;
  deleting = false;

  constructor(private projectsService: ProjectsService) {}

  ngOnInit() {
    this.loadProjects();
  }

  async loadProjects() {
    this.loading = true;
    this.error = null;

    try {
      this.projects = await this.projectsService.getAllProjects();
      this.applyFilter();
    } catch (err: any) {
      this.error = err.message || 'Erro ao carregar projetos';
    } finally {
      this.loading = false;
    }
  }

  filterByStatus(status: string) {
    this.filterStatus = status;
    this.applyFilter();
  }

  applyFilter() {
    if (this.filterStatus === 'all') {
      this.filteredProjects = this.projects;
    } else {
      this.filteredProjects = this.projects.filter(p => p.status === this.filterStatus);
    }
  }

  getTotalByStatus(status: string): number {
    if (status === 'all') return this.projects.length;
    return this.projects.filter(p => p.status === status).length;
  }

  getCategoryLabel(category: string): string {
    const labels: Record<string, string> = {
      'institutional': 'Institucional',
      'ecommerce': 'E-commerce',
      'landing-page': 'Landing Page'
    };
    return labels[category] || category;
  }

  getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
      'published': 'Publicado',
      'draft': 'Rascunho',
      'archived': 'Arquivado'
    };
    return labels[status] || status;
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  }

  confirmDelete(project: Project) {
    this.projectToDelete = project;
  }

  cancelDelete() {
    this.projectToDelete = null;
  }

  async deleteProject() {
    if (!this.projectToDelete) return;

    this.deleting = true;

    try {
      await this.projectsService.deleteProject(this.projectToDelete.id);
      this.projects = this.projects.filter(p => p.id !== this.projectToDelete!.id);
      this.applyFilter();
      this.projectToDelete = null;
    } catch (err: any) {
      alert('Erro ao excluir projeto: ' + err.message);
    } finally {
      this.deleting = false;
    }
  }
}
