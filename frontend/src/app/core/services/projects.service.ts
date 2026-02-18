import { Injectable } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor(private api: ApiService) {}

  // Observable methods (for reactive programming)
  getAll(status?: string): Observable<any[]> {
    const params = status ? { status } : {};
    return this.api.get<any[]>('projects', params);
  }

  getById(id: string): Observable<any> {
    return this.api.get<any>(`projects/${id}`);
  }

  getBySlug(slug: string): Observable<any> {
    return this.api.get<any>(`projects/slug/${slug}`);
  }

  create(project: any): Observable<any> {
    return this.api.post<any>('projects', project);
  }

  update(id: string, project: any): Observable<any> {
    return this.api.put<any>(`projects/${id}`, project);
  }

  delete(id: string): Observable<any> {
    return this.api.delete(`projects/${id}`);
  }

  // Promise-based methods (for admin CRUD components)
  async getAllProjects(status?: string): Promise<any[]> {
    const params = status ? { status } : {};
    return firstValueFrom(this.api.get<any[]>('projects', params));
  }

  async getProjectById(id: string): Promise<any> {
    return firstValueFrom(this.api.get<any>(`projects/${id}`));
  }

  async createProject(project: any): Promise<any> {
    return firstValueFrom(this.api.post<any>('projects', project));
  }

  async updateProject(id: string, project: any): Promise<any> {
    return firstValueFrom(this.api.put<any>(`projects/${id}`, project));
  }

  async deleteProject(id: string): Promise<void> {
    return firstValueFrom(this.api.delete(`projects/${id}`));
  }
}
