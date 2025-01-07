import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { BackendResponse } from '../models/backendResponse';
//import { handleError } from './aux/errorHandler';
@Injectable({
  providedIn: 'root',
})
export class SuppliersService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  getSuppliers(): Observable<BackendResponse> {
    return this.http.get<BackendResponse>(`${this.apiUrl}/suppliers`);
    // err gestionado en componente
    //.pipe(catchError(handleError));
  }
}
