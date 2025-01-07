import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'melApp-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  user: string | null = null;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthenticationService
  ) {
    const userEmail = localStorage.getItem('user');
    if (userEmail) {
      this.user = userEmail;
    }
  }

  logOut():void {
    this.authService.logOut();
  }}
