import { Component } from '@angular/core';
import { RouterOutlet, RouterModule, Router } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';

@Component({
  selector: 'melApp-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'MelApp';
  showNavbar: boolean = true;

  constructor(private readonly router: Router) {
    this.router.events.subscribe(() => {
      this.showNavbar = !this.isLoginOrRegisterRoute();
    });
  }

  // renderizar condicionalmente NavbarComponent
  private isLoginOrRegisterRoute(): boolean {
    return this.router.url === '/login' || this.router.url === '/register';
  }
}
