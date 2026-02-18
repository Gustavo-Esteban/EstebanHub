import { Routes } from '@angular/router';

export const leadsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./leads-list.component').then(m => m.LeadsListComponent)
  }
];
