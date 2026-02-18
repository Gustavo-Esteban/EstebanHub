import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-portfolio-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="portfolio-page">
      <!-- Header -->
      <section class="page-header">
        <div class="container">
          <h1>Nosso Portfólio</h1>
          <p>Conheça alguns dos projetos que desenvolvemos com dedicação e expertise</p>
        </div>
      </section>

      <!-- Filters -->
      <section class="filters-section">
        <div class="container">
          <div class="filters">
            <button
              class="filter-btn"
              [class.active]="activeFilter === 'all'"
              (click)="setFilter('all')">
              Todos
            </button>
            <button
              class="filter-btn"
              [class.active]="activeFilter === 'institutional'"
              (click)="setFilter('institutional')">
              Institucional
            </button>
            <button
              class="filter-btn"
              [class.active]="activeFilter === 'ecommerce'"
              (click)="setFilter('ecommerce')">
              E-commerce
            </button>
            <button
              class="filter-btn"
              [class.active]="activeFilter === 'landing-page'"
              (click)="setFilter('landing-page')">
              Landing Page
            </button>
          </div>
        </div>
      </section>

      <!-- Loading -->
      <div class="loading" *ngIf="loading">
        <div class="spinner"></div>
      </div>

      <!-- Projects Grid -->
      <section class="projects-section" *ngIf="!loading">
        <div class="container">
          <div class="projects-grid" *ngIf="filteredProjects.length > 0; else emptyState">
            <div class="project-card" *ngFor="let project of filteredProjects">
              <div class="card-image">
                <img
                  *ngIf="project.thumbnail_url"
                  [src]="project.thumbnail_url"
                  [alt]="project.title"
                  loading="lazy"
                >
                <div *ngIf="!project.thumbnail_url" class="placeholder-image">
                  <span>🖥️</span>
                </div>
                <div class="card-overlay">
                  <a [routerLink]="['/portfolio', project.slug]" class="view-btn">
                    Ver Case
                  </a>
                </div>
                <div class="category-badge">
                  {{ getCategoryLabel(project.category) }}
                </div>
              </div>
              <div class="card-content">
                <h3>{{ project.title }}</h3>
                <p>{{ project.short_description }}</p>
                <div class="tech-list" *ngIf="project.technologies?.length > 0">
                  <span class="tech-tag" *ngFor="let tech of project.technologies?.slice(0, 3)">
                    {{ tech }}
                  </span>
                  <span class="tech-more" *ngIf="project.technologies?.length > 3">
                    +{{ project.technologies.length - 3 }}
                  </span>
                </div>
                <a [routerLink]="['/portfolio', project.slug]" class="case-link">
                  Ver Case Completo →
                </a>
              </div>
            </div>
          </div>

          <ng-template #emptyState>
            <div class="empty-state">
              <div class="icon">📁</div>
              <h3>Nenhum projeto encontrado</h3>
              <p>Em breve teremos projetos nessa categoria</p>
            </div>
          </ng-template>
        </div>
      </section>

    </div>
  `,
  styles: [`
    .portfolio-page {
      min-height: 100vh;
      background: #f9fafb;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 20px;
    }

    .page-header {
      background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%);
      padding: 100px 20px 60px;
      text-align: center;
      color: white;
    }

    .page-header h1 {
      font-size: 48px;
      margin: 0 0 16px;
      font-weight: 800;
    }

    .page-header p {
      font-size: 20px;
      opacity: 0.85;
      max-width: 600px;
      margin: 0 auto;
    }

    .filters-section {
      padding: 30px 20px;
      background: white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.06);
      position: sticky;
      top: 0;
      z-index: 10;
    }

    .filters {
      display: flex;
      gap: 12px;
      justify-content: center;
      flex-wrap: wrap;
    }

    .filter-btn {
      padding: 10px 28px;
      border: 2px solid #e5e7eb;
      background: white;
      border-radius: 30px;
      cursor: pointer;
      font-size: 15px;
      font-weight: 500;
      color: #374151;
      transition: all 0.3s;
    }

    .filter-btn:hover, .filter-btn.active {
      background: linear-gradient(135deg, #667eea, #764ba2);
      border-color: transparent;
      color: white;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
    }

    .loading {
      display: flex;
      justify-content: center;
      padding: 60px 20px;
    }

    .spinner {
      width: 50px;
      height: 50px;
      border: 4px solid #e5e7eb;
      border-top: 4px solid #6366f1;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .projects-section {
      padding: 60px 20px;
    }

    .projects-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
      gap: 32px;
    }

    .project-card {
      background: white;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 15px rgba(0,0,0,0.08);
      transition: all 0.4s;
    }

    .project-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 12px 40px rgba(0,0,0,0.15);
    }

    .card-image {
      position: relative;
      height: 240px;
      overflow: hidden;
    }

    .card-image img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.6s;
    }

    .project-card:hover .card-image img {
      transform: scale(1.08);
    }

    .placeholder-image {
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #667eea22, #764ba222);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 64px;
    }

    .card-overlay {
      position: absolute;
      inset: 0;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s;
    }

    .project-card:hover .card-overlay {
      opacity: 1;
    }

    .view-btn {
      padding: 12px 28px;
      background: white;
      color: #6366f1;
      text-decoration: none;
      border-radius: 30px;
      font-weight: 700;
      font-size: 15px;
      transition: transform 0.2s;
    }

    .view-btn:hover {
      transform: scale(1.05);
    }

    .category-badge {
      position: absolute;
      top: 16px;
      left: 16px;
      padding: 6px 14px;
      background: rgba(255,255,255,0.95);
      border-radius: 20px;
      font-size: 13px;
      font-weight: 600;
      color: #6366f1;
    }

    .card-content {
      padding: 24px;
    }

    .card-content h3 {
      margin: 0 0 12px;
      font-size: 20px;
      color: #1a1a1a;
      font-weight: 700;
    }

    .card-content p {
      color: #6b7280;
      font-size: 15px;
      line-height: 1.6;
      margin-bottom: 16px;
    }

    .tech-list {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 20px;
    }

    .tech-tag {
      padding: 4px 12px;
      background: #f0f0ff;
      color: #4f46e5;
      border-radius: 12px;
      font-size: 12px;
      font-weight: 600;
    }

    .tech-more {
      padding: 4px 12px;
      background: #f9fafb;
      color: #9ca3af;
      border-radius: 12px;
      font-size: 12px;
    }

    .case-link {
      color: #6366f1;
      text-decoration: none;
      font-weight: 600;
      font-size: 14px;
      transition: gap 0.2s;
    }

    .case-link:hover {
      text-decoration: underline;
    }

    .empty-state {
      text-align: center;
      padding: 80px 20px;
    }

    .empty-state .icon {
      font-size: 80px;
      margin-bottom: 20px;
    }

    .empty-state h3 {
      font-size: 24px;
      margin-bottom: 10px;
    }

    .empty-state p {
      color: #6b7280;
    }

    @media (max-width: 768px) {
      .page-header h1 { font-size: 32px; }
      .page-header p { font-size: 16px; }
      .projects-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class PortfolioListComponent implements OnInit {
  projects: any[] = [];
  filteredProjects: any[] = [];
  activeFilter = 'all';
  loading = false;

  constructor(private api: ApiService) {}

  ngOnInit() { this.loadProjects(); }

  async loadProjects() {
    this.loading = true;
    try {
      this.projects = await firstValueFrom(this.api.get<any[]>('projects'));
      this.applyFilter();
    } catch (err) {
      // Error handled silently on public pages
    } finally {
      this.loading = false;
    }
  }

  setFilter(filter: string) {
    this.activeFilter = filter;
    this.applyFilter();
  }

  applyFilter() {
    this.filteredProjects = this.activeFilter === 'all'
      ? this.projects
      : this.projects.filter(p => p.category === this.activeFilter);
  }

  getCategoryLabel(category: string): string {
    return {
      'institutional': 'Institucional',
      'ecommerce': 'E-commerce',
      'landing-page': 'Landing Page'
    }[category] || category;
  }
}
