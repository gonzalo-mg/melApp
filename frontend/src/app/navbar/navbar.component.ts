import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'melApp-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  user: string | null = null;

  constructor() {
    const userEmail = localStorage.getItem('user');
    if (userEmail) {
      this.user = userEmail;
    }
  }
}
