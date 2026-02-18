import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Settings, UpdateSettingsDto } from '../../../../../shared/src';

@Injectable({
  providedIn: 'root',
})
export class SettingsService {
  constructor(private api: ApiService) {}

  get(): Observable<Settings> {
    return this.api.get<Settings>('settings');
  }

  update(settings: UpdateSettingsDto): Observable<Settings> {
    return this.api.put<Settings>('settings', settings);
  }
}
