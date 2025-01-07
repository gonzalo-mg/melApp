import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { BackendResponse } from '../models/backendResponse';

@Injectable({
  providedIn: 'root',
})
export class HarvestsService {
  private readonly apiUrl = `${environment.apiUrl}/harvestsº`;

  constructor(private readonly http: HttpClient) {}

  getHarvests(): Observable<BackendResponse> {
    return this.http.get<BackendResponse>(this.apiUrl);
    // error gestionado en componente
  }
}
