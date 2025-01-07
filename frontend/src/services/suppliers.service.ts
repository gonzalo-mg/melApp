import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { BackendResponse } from '../models/backendResponse';

@Injectable({
  providedIn: 'root',
})
export class SuppliersService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  getSuppliers(): Observable<BackendResponse> {
    /* const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyRW1haWwiOiJhYmVqYW1heWFAZW1haWwuY29tIiwiaWF0IjoxNzM2MTkwMDk2LCJleHAiOjE3MzYyNzY0OTZ9.eACh27t607uvna7GAWKcWiA129CU6dK2tSQBRfH0d-A',
    }); */

    return this.http
      //.get<BackendResponse>(`${this.apiUrl}/suppliers`, { headers })
      .get<BackendResponse>(`${this.apiUrl}/suppliers`)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred.';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}.`;
    } else {
      // Server-side error
      errorMessage = `Error from server - Code: ${error.status}. Message: ${error.message}; ${error.error.message}. `;// el ultimo string es el mensaje de error especifico q envio desde el backend
    }
    return throwError(() => new Error(errorMessage));
  }
}
