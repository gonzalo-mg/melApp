import { Component, OnInit } from '@angular/core';
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
export class NavbarComponent implements OnInit {
  userToDisplay: string | null = null;

  constructor(
    private readonly router: Router,
    private readonly authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    const userEmail = localStorage.getItem('user');
    if (userEmail) {
      //console.log(`userToDisplay: ${userEmail?.split('@')[0]}`);
      this.userToDisplay = userEmail?.split('@')[0];
    }
  }

  logOut(): void {
    this.authService.logOut();
  }
}
