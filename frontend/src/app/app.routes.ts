import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  // Public routes (wrapped in PublicLayout with navbar + footer)
  {
    path: '',
    loadComponent: () =>
      import('./layout/public-layout/public-layout.component').then((m) => m.PublicLayoutComponent),
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
          import('./features/public/home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'portfolio',
        loadChildren: () =>
          import('./features/public/portfolio/portfolio.routes').then((m) => m.portfolioRoutes),
      },
      {
        path: 'servicos',
        loadChildren: () =>
          import('./features/public/services/services.routes').then((m) => m.servicesRoutes),
      },
      {
        path: 'sobre',
        loadComponent: () =>
          import('./features/public/about/about.component').then((m) => m.AboutComponent),
      },
    ],
  },

  // Admin login (public)
  {
    path: 'admin/login',
    loadComponent: () =>
      import('./features/admin/login/login.component').then((m) => m.LoginComponent),
  },

  // Admin routes (protected)
  {
    path: 'admin',
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/admin/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
      },
      {
        path: 'projetos',
        loadChildren: () =>
          import('./features/admin/projects/projects.routes').then((m) => m.projectsRoutes),
      },
      {
        path: 'depoimentos',
        loadChildren: () =>
          import('./features/admin/testimonials/testimonials.routes').then(
            (m) => m.testimonialsRoutes
          ),
      },
      {
        path: 'leads',
        loadChildren: () =>
          import('./features/admin/leads/leads.routes').then((m) => m.leadsRoutes),
      },
      {
        path: 'configuracoes',
        loadComponent: () =>
          import('./features/admin/settings/settings.component').then(
            (m) => m.SettingsComponent
          ),
      },
    ],
  },

];
