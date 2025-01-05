import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { BackendResponse } from '../../models/backendResponse';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private readonly apiUrl = environment.apiUrl;

  user = {
    email: '',
    password: '',
  };

  constructor(private readonly authService: AuthenticationService) {}

  onSubmit() {
    console.log('Formulario enviado:', this.user);
    // lógica para manejar el login
    const resp = this.authService.postLogin(this.user);
    resp.subscribe({
      next: (response) => {
        // el token jwt
        console.log(`response.payload: ${response.payload.userToken}`);
        // guardar token
        localStorage.setItem('token', response.payload.userToken);
      },
      error: (err) => {
        console.error('Error login', err);
      },
    });
  }
}
