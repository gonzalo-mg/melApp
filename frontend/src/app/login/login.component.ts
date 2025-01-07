import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { environment } from '../../environments/environment';

import { User } from '../../models/user.model';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private readonly apiUrl = environment.apiUrl;

  public readonly user: User = {
    email: '',
    password: '',
  };
  public errorMessage: string = ``;
  public loading: boolean = false;

  constructor(
    private readonly authService: AuthenticationService,
    private readonly router: Router
  ) {}

  onSubmit() {
    // evitar solape submits
    if (this.loading) return;

    // resetear variables
    this.loading = true;
    this.errorMessage = '';

    // lógica para manejar el login
    const resp = this.authService.loginUser(this.user);
    resp.subscribe({
      next: (response) => {
        // guardar token
        localStorage.setItem('token', response.payload.userToken);
        localStorage.setItem('user', this.user.email);

        this.loading = false;

        // si ok
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.loading = false;
        console.error(this.errorMessage, err);
      },
    });
  }
}
