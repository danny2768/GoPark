import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service';

interface SidebarItem {
  name: string;
  route: string;
  icon: string;
  isActive: boolean;
}

@Component({
  selector: 'admin-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {

  public sidebarItems: SidebarItem[] =[
    { name: 'Dashboard', route: 'dashboard', icon: 'assets/icons/dashboard.svg', isActive: true },
    { name: 'Users', route: 'users', icon: 'assets/icons/users.svg', isActive: true },
    { name: 'Parking', route: 'parking', icon: 'assets/icons/parking.svg', isActive: true },
  ]

  constructor(
    private authService: AuthService,
  ) {}

  logout() {
    this.authService.logOut();
  }
}
