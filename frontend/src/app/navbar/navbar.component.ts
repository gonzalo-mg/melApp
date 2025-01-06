import { Component } from '@angular/core';
import { User } from '../../models/user.model';

@Component({
  selector: 'melApp-navbar',
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  user: User = { email: '', password: '' };
}
