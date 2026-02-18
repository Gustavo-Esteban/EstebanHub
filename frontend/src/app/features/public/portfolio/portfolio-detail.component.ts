import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../../core/services/api.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-portfolio-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="portfolio-detail">
      <div class="loading" *ngIf="loading">
        <div class="spinner"></div>
      </div>

      <div class="not-found" *ngIf="!loading && !project">
        <h2>Projeto não encontrado</h2>
        <a [routerLink]="['/portfolio']">← Voltar ao Portfólio</a>
      </div>

      <div *ngIf="!loading && project">
        <!-- Hero -->
        <section class="hero" [style.backgroundImage]="project.thumbnail_url ? 'url(' + project.thumbnail_url + ')' : 'none'">
          <div class="hero-overlay">
            <div class="container">
              <a [routerLink]="['/portfolio']" class="back-link">← Portfólio</a>
              <div class="category-badge">{{ getCategoryLabel(project.category) }}</div>
              <h1>{{ project.title }}</h1>
              <p>{{ project.short_description }}</p>
            </div>
          </div>
        </section>

        <!-- Project Info -->
        <section class="project-info">
          <div class="container">
            <div class="info-grid">
              <div class="info-item" *ngIf="project.client_name">
                <span class="info-label">Cliente</span>
                <span class="info-value">{{ project.client_name }}</span>
              </div>
              <div class="info-item">
                <span class="info-label">Categoria</span>
                <span class="info-value">{{ getCategoryLabel(project.category) }}</span>
              </div>
              <div class="info-item" *ngIf="project.technologies?.length > 0">
                <span class="info-label">Tecnologias</span>
                <div class="tech-tags">
                  <span class="tech-tag" *ngFor="let tech of project.technologies">{{ tech }}</span>
                </div>
              </div>
              <div class="info-item" *ngIf="project.project_url">
                <span class="info-label">Link do Projeto</span>
                <a [href]="project.project_url" target="_blank" class="project-link">
                  Visitar Site →
                </a>
              </div>
            </div>
          </div>
        </section>

        <!-- Description -->
        <section class="description-section" *ngIf="project.description">
          <div class="container">
            <h2>Sobre o Projeto</h2>
            <div class="description-text">{{ project.description }}</div>
          </div>
        </section>

        <!-- Gallery -->
        <section class="gallery-section" *ngIf="project.images?.length > 0">
          <div class="container">
            <h2>Galeria</h2>
            <div class="gallery-grid">
              <div class="gallery-item" *ngFor="let img of project.images" (click)="openImage(img)">
                <img [src]="img" [alt]="project.title" loading="lazy">
                <div class="gallery-overlay">🔍</div>
              </div>
            </div>
          </div>
        </section>

        <!-- Navigation -->
        <section class="nav-section">
          <div class="container">
            <a [routerLink]="['/portfolio']" class="btn-back">← Ver Todos os Projetos</a>
            <a href="https://wa.me/5511999999999" target="_blank" class="btn-cta">
              💬 Solicitar Projeto Similar
            </a>
          </div>
        </section>
      </div>

      <!-- Lightbox -->
      <div class="lightbox" *ngIf="lightboxImage" (click)="closeLightbox()">
        <img [src]="lightboxImage" alt="Gallery" (click)="$event.stopPropagation()">
        <button class="close-btn" (click)="closeLightbox()">×</button>
      </div>
    </div>
  `,
  styles: [`
    .loading { display: flex; justify-content: center; padding: 100px 20px; }
    .spinner { width: 50px; height: 50px; border: 4px solid #e5e7eb; border-top: 4px solid #6366f1; border-radius: 50%; animation: spin 1s linear infinite; }
    @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
    .not-found { text-align: center; padding: 100px 20px; }
    .not-found a { color: #6366f1; text-decoration: none; }
    .container { max-width: 1000px; margin: 0 auto; padding: 0 20px; }
    .hero { min-height: 500px; background: linear-gradient(135deg, #1a1a2e, #16213e); background-size: cover; background-position: center; display: flex; align-items: flex-end; }
    .hero-overlay { width: 100%; background: linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 100%); padding: 60px 20px; color: white; }
    .back-link { color: rgba(255,255,255,0.8); text-decoration: none; display: inline-block; margin-bottom: 16px; }
    .back-link:hover { color: white; }
    .category-badge { display: inline-block; padding: 6px 16px; background: rgba(102, 126, 234, 0.9); border-radius: 20px; font-size: 13px; font-weight: 600; margin-bottom: 16px; }
    .hero-overlay h1 { font-size: 48px; margin: 0 0 16px; font-weight: 800; }
    .hero-overlay p { font-size: 20px; opacity: 0.85; max-width: 700px; margin: 0; }
    .project-info { padding: 50px 20px; background: white; border-bottom: 1px solid #f3f4f6; }
    .info-grid { display: flex; gap: 40px; flex-wrap: wrap; }
    .info-item { display: flex; flex-direction: column; gap: 8px; }
    .info-label { font-size: 12px; font-weight: 700; color: #9ca3af; text-transform: uppercase; letter-spacing: 1px; }
    .info-value { font-size: 16px; color: #1a1a1a; font-weight: 600; }
    .tech-tags { display: flex; gap: 8px; flex-wrap: wrap; }
    .tech-tag { padding: 4px 14px; background: #f0f0ff; color: #4f46e5; border-radius: 12px; font-size: 13px; font-weight: 600; }
    .project-link { color: #6366f1; text-decoration: none; font-weight: 600; font-size: 16px; }
    .project-link:hover { text-decoration: underline; }
    .description-section { padding: 60px 20px; }
    .description-section h2 { font-size: 28px; margin-bottom: 24px; color: #1a1a1a; }
    .description-text { font-size: 16px; line-height: 1.8; color: #374151; white-space: pre-wrap; }
    .gallery-section { padding: 60px 20px; background: #f9fafb; }
    .gallery-section h2 { font-size: 28px; margin-bottom: 32px; color: #1a1a1a; }
    .gallery-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 16px; }
    .gallery-item { position: relative; aspect-ratio: 16/9; border-radius: 12px; overflow: hidden; cursor: pointer; }
    .gallery-item img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.4s; }
    .gallery-item:hover img { transform: scale(1.05); }
    .gallery-overlay { position: absolute; inset: 0; background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center; font-size: 32px; opacity: 0; transition: opacity 0.3s; }
    .gallery-item:hover .gallery-overlay { opacity: 1; }
    .nav-section { padding: 60px 20px; background: white; display: flex; justify-content: center; }
    .nav-section .container { display: flex; gap: 20px; justify-content: center; flex-wrap: wrap; }
    .btn-back { padding: 16px 32px; border: 2px solid #6366f1; color: #6366f1; text-decoration: none; border-radius: 50px; font-weight: 700; transition: all 0.2s; }
    .btn-back:hover { background: #6366f1; color: white; }
    .btn-cta { padding: 16px 32px; background: linear-gradient(135deg, #667eea, #764ba2); color: white; text-decoration: none; border-radius: 50px; font-weight: 700; transition: transform 0.2s; }
    .btn-cta:hover { transform: translateY(-3px); }
    .lightbox { position: fixed; inset: 0; background: rgba(0,0,0,0.95); display: flex; align-items: center; justify-content: center; z-index: 1000; }
    .lightbox img { max-width: 90%; max-height: 90vh; border-radius: 8px; }
    .close-btn { position: absolute; top: 20px; right: 24px; background: none; border: none; color: white; font-size: 36px; cursor: pointer; }
    @media (max-width: 768px) { .hero-overlay h1 { font-size: 28px; } .hero-overlay p { font-size: 16px; } }
  `]
})
export class PortfolioDetailComponent implements OnInit {
  project: any = null;
  loading = false;
  lightboxImage: string | null = null;

  constructor(private route: ActivatedRoute, private api: ApiService) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const slug = params.get('slug');
      if (slug) this.loadProject(slug);
    });
  }

  async loadProject(slug: string) {
    this.loading = true;
    try {
      this.project = await firstValueFrom(this.api.get<any>(`projects/slug/${slug}`));
    } catch (err) {
      this.project = null;
    } finally {
      this.loading = false;
    }
  }

  getCategoryLabel(category: string): string {
    return { 'institutional': 'Institucional', 'ecommerce': 'E-commerce', 'landing-page': 'Landing Page' }[category] || category;
  }

  openImage(url: string) { this.lightboxImage = url; }
  closeLightbox() { this.lightboxImage = null; }
}
