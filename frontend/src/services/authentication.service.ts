import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
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
    return this.http.post<BackendResponse>(`${this.apiUrl}/login`, user);
  }

  //error gestionado en componentes; del backend llegan errores específicos q aportan info a la interfaz
/*   private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = `Authentication - Code: ${error.status}. Message: ${error.message}; ${error.error.message} `; // el ultimo string es el mensaje de error especifico q envio desde el backend

    return throwError(() => new Error(errorMessage));
  } */
}
