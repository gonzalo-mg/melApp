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
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly apiUrl = environment.apiUrl;

  constructor(private readonly http: HttpClient) {}

  postLogin(user: User): Observable<BackendResponse> {
    const resp = this.http.post<BackendResponse>(`${this.apiUrl}/login`, user);
    // devolver response o error
    return resp.pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = `Error from server - Code: ${error.status}. Message: ${error.message}; ${error.error.message}. `; // el ultimo string es el mensaje de error especifico q envio desde el backend

    return throwError(() => new Error(errorMessage));
  }
}
