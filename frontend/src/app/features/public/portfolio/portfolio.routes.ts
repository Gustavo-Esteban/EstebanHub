import { Routes } from '@angular/router';

export const portfolioRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./portfolio-list.component').then(m => m.PortfolioListComponent)
  },
  {
    path: ':slug',
    loadComponent: () => import('./portfolio-detail.component').then(m => m.PortfolioDetailComponent)
  }
];
