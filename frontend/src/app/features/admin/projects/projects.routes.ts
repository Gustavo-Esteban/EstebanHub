import { Routes } from '@angular/router';

export const projectsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./project-list.component').then(m => m.ProjectListComponent)
  },
  {
    path: 'new',
    loadComponent: () => import('./project-form.component').then(m => m.ProjectFormComponent)
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./project-form.component').then(m => m.ProjectFormComponent)
  }
];
