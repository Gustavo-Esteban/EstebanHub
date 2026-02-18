import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Lead, CreateLeadDto, UpdateLeadDto } from '../../../../../shared/src';

@Injectable({
  providedIn: 'root',
})
export class LeadsService {
  constructor(private api: ApiService) {}

  getAll(status?: string): Observable<Lead[]> {
    const params = status ? { status } : {};
    return this.api.get<Lead[]>('leads', params);
  }

  getById(id: string): Observable<Lead> {
    return this.api.get<Lead>(`leads/${id}`);
  }

  create(lead: CreateLeadDto): Observable<Lead> {
    return this.api.post<Lead>('leads', lead);
  }

  update(id: string, lead: UpdateLeadDto): Observable<Lead> {
    return this.api.put<Lead>(`leads/${id}`, lead);
  }

  delete(id: string): Observable<any> {
    return this.api.delete(`leads/${id}`);
  }
}
