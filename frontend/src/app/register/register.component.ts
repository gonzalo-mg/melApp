import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';

import { User } from '../../models/user.model';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'melApp-register',
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private readonly apiUrl = environment.apiUrl;

  public readonly user: User = {
    email: '',
    password: '',
  };
  public readonly user2: User = {
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
    const resp = this.authService.registerUser(this.user);
    resp.subscribe({
      next: (response) => {
        this.loading = false;

        // si ok
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.loading = false;
        console.error(this.errorMessage, err);
      },
    });
  }
}
