import { Routes } from '@angular/router';

export const servicesRoutes: Routes = [
  // TODO: Implementar rotas de serviços
  {
    path: '',
    loadComponent: () => import('./services-list.component').then(m => m.ServicesListComponent)
  }
];
