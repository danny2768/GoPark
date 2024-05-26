import { Component } from '@angular/core';

interface MenuItems {
  title: string;
  url: string;
}

@Component({
  selector: 'shared-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  public showMobileMenu: boolean = false;

  public menuItems: MenuItems[] = [
    {title: 'Home', url: '/home'},
    {title: 'Pricing', url: '#Pricing'},
    {title: 'Log In', url: '/auth/login'},
  ];

  toggleMobileMenu() {
    this.showMobileMenu = !this.showMobileMenu;
  }

}
