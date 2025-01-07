import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { BackendResponse } from '../models/backendResponse';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private readonly apiUrl = environment.apiUrl;

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  loginUser(user: User): Observable<BackendResponse> {
    return this.http.post<BackendResponse>(`${this.apiUrl}/login`, user);
  }

  registerUser(user: User): Observable<BackendResponse> {
    return this.http.post<BackendResponse>(`${this.apiUrl}/register`, user);
  }

  logOut(): Promise<boolean> {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    return this.router.navigate(['/login']);
  }

  //error gestionado en componentes; del backend llegan errores específicos q aportan info a la interfaz
  /*   private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = `Authentication - Code: ${error.status}. Message: ${error.message}; ${error.error.message} `; // el ultimo string es el mensaje de error especifico q envio desde el backend

    return throwError(() => new Error(errorMessage));
  } */
}
