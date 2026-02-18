import { Routes } from '@angular/router';

export const testimonialsRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./testimonials-list.component').then(m => m.TestimonialsListComponent)
  },
  {
    path: 'new',
    loadComponent: () => import('./testimonials-form.component').then(m => m.TestimonialsFormComponent)
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./testimonials-form.component').then(m => m.TestimonialsFormComponent)
  }
];
