import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { BackendResponse } from '../models/backendResponse';

@Injectable({
  providedIn: 'root',
})
export class QueensService {
  private readonly apiUrl = `${environment.apiUrl}/queens`;

  constructor(private readonly http: HttpClient) {}

  getQueens(): Observable<BackendResponse> {
    return this.http
      .get<BackendResponse>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred.';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}.`;
    } else {
      // Server-side error
      errorMessage = `Error from server - Code: ${error.status}. Message: ${error.message}; ${error.error.message}. `; // el ultimo string es el mensaje de error especifico q envio desde el backend
    }
    return throwError(() => new Error(errorMessage));
  }
}
