import { Component, HostListener, OnInit } from '@angular/core';
import { Emitters } from 'src/app/emitter/emitter';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isNavbarDropdownOpen = false;
  isDropdownNavbarOpen = false;
  authenticated: boolean = false;
  isMenuVisibleOnNormalScreens = true;

  constructor(private service: AuthServiceService) {}

  ngOnInit(): void {
    Emitters.authEmitter.subscribe((auth: boolean) => {
      this.authenticated = auth;
    });
  }

  toggleNavbarDropdown() {
    this.isNavbarDropdownOpen = !this.isNavbarDropdownOpen;
  }

  toggleDropdownNavbar() {
    this.isDropdownNavbarOpen = !this.isDropdownNavbarOpen;
  }
  isAuthenticated(): boolean {
    return this.authenticated;
  }

  logout() {
    localStorage.removeItem('token');
    this.service.user_logout();
    Emitters.authEmitter.emit(false);
  }
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  isDropdownOpen= false
  dropdown(){
    this.isDropdownOpen =!this.isDropdownOpen
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize(event: Event) {
    const screenWidth = (event.target as Window).innerWidth;
    if (screenWidth > 768) { // Adjust the screen width threshold as needed
      this.isNavbarDropdownOpen = false;
    }
    if(screenWidth<768){
      this.isMenuOpen = false
      this.isDropdownOpen = false
    }
  }

}
