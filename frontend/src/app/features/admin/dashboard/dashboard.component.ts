import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { LeadsService } from '../../../core/services/leads.service';
import { ProjectsService } from '../../../core/services/projects.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="dashboard">
      <div class="dashboard-header">
        <h1>Dashboard</h1>
        <button (click)="logout()" class="btn-logout">Sair</button>
      </div>

      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">📊</div>
          <div class="stat-info">
            <h3>{{ stats.totalLeads }}</h3>
            <p>Total de Leads</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">🆕</div>
          <div class="stat-info">
            <h3>{{ stats.newLeads }}</h3>
            <p>Leads Novos</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">📁</div>
          <div class="stat-info">
            <h3>{{ stats.totalProjects }}</h3>
            <p>Projetos</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-icon">✅</div>
          <div class="stat-info">
            <h3>{{ stats.publishedProjects }}</h3>
            <p>Publicados</p>
          </div>
        </div>
      </div>

      <div class="quick-links">
        <h2>Acesso Rápido</h2>
        <div class="links-grid">
          <a routerLink="/admin/projetos" class="quick-link-card">
            <div class="link-icon">📁</div>
            <h3>Projetos</h3>
            <p>Gerenciar portfólio</p>
          </a>

          <a routerLink="/admin/leads" class="quick-link-card">
            <div class="link-icon">📨</div>
            <h3>Leads</h3>
            <p>Ver contatos</p>
          </a>

          <a routerLink="/admin/depoimentos" class="quick-link-card">
            <div class="link-icon">💬</div>
            <h3>Depoimentos</h3>
            <p>Gerenciar reviews</p>
          </a>

          <a routerLink="/admin/configuracoes" class="quick-link-card">
            <div class="link-icon">⚙️</div>
            <h3>Configurações</h3>
            <p>Ajustes do site</p>
          </a>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }

    .dashboard {
      padding: 40px;
      max-width: 1400px;
      margin: 0 auto;
    }

    .dashboard-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 40px;
    }

    .dashboard-header h1 {
      font-size: 36px;
      color: #1e293b;
      margin: 0;
    }

    .btn-logout {
      padding: 10px 24px;
      background: #ef4444;
      color: white;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s;
    }

    .btn-logout:hover {
      background: #dc2626;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 24px;
      margin-bottom: 50px;
    }

    .stat-card {
      background: white;
      border-radius: 12px;
      padding: 24px;
      display: flex;
      align-items: center;
      gap: 20px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .stat-icon {
      font-size: 48px;
    }

    .stat-info h3 {
      font-size: 32px;
      font-weight: 700;
      color: #667eea;
      margin: 0 0 5px 0;
    }

    .stat-info p {
      color: #64748b;
      margin: 0;
      font-size: 14px;
    }

    .quick-links h2 {
      font-size: 24px;
      color: #1e293b;
      margin-bottom: 24px;
    }

    .links-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 20px;
    }

    .quick-link-card {
      background: white;
      border-radius: 12px;
      padding: 30px 24px;
      text-align: center;
      text-decoration: none;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: all 0.3s;
    }

    .quick-link-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    }

    .link-icon {
      font-size: 48px;
      margin-bottom: 16px;
    }

    .quick-link-card h3 {
      font-size: 18px;
      color: #1e293b;
      margin: 0 0 8px 0;
    }

    .quick-link-card p {
      color: #64748b;
      font-size: 14px;
      margin: 0;
    }
  `]
})
export class DashboardComponent implements OnInit {
  stats = {
    totalLeads: 0,
    newLeads: 0,
    totalProjects: 0,
    publishedProjects: 0,
  };

  constructor(
    private authService: AuthService,
    private leadsService: LeadsService,
    private projectsService: ProjectsService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    // Load all leads
    this.leadsService.getAll().subscribe({
      next: (leads) => {
        this.stats.totalLeads = leads.length;
        this.stats.newLeads = leads.filter((l) => l.status === 'new').length;
      },
      error: (error) => console.error('Error loading leads:', error),
    });

    // Load all projects
    this.projectsService.getAll().subscribe({
      next: (projects) => {
        this.stats.totalProjects = projects.length;
        this.stats.publishedProjects = projects.filter((p) => p.status === 'published').length;
      },
      error: (error) => console.error('Error loading projects:', error),
    });
  }

  async logout() {
    await this.authService.logout();
    this.router.navigate(['/admin/login']);
  }
}
