import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { opacity } from '@cloudinary/url-gen/actions/adjust';
import { list } from 'postcss';
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
  showMenuItems: boolean = false;
  showmenu :boolean = false

  constructor(private service: AuthServiceService,
    private router: Router
  ) { }

  ngOnInit(): void {
    Emitters.authEmitter.subscribe((auth: boolean) => {
      this.authenticated = auth;
    });
  this.showMenuItems = window.innerWidth > 768;
  }

  toggleNavbarDropdown() {
    this.isNavbarDropdownOpen = !this.isNavbarDropdownOpen;
  }

    toggleMenuItems() {
    this.showMenuItems = !this.showMenuItems;
  }
  // toggleDropdownNavbar() {
  //   this.isDropdownNavbarOpen = !this.isDropdownNavbarOpen;
  // }
  isAuthenticated(): boolean {
    return this.authenticated;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId')
    this.service.user_logout();
    this.router.navigate([''])
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

  menu() {
    this.showmenu = !this.showmenu 
   
  }






}
