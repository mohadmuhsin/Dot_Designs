import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isNavbarDropdownOpen = false;
  isDropdownNavbarOpen = false;

  toggleNavbarDropdown() {
    this.isNavbarDropdownOpen = !this.isNavbarDropdownOpen;
  }

  toggleDropdownNavbar() {
    this.isDropdownNavbarOpen = !this.isDropdownNavbarOpen;
  }
}
