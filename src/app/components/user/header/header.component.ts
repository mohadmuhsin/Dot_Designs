import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Emitters } from 'src/app/emitter/emitter';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

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
  showmenu: boolean = false;

  ContactForm!: FormGroup;
  isModalOpen: boolean = false;

  constructor(
    private router: Router,
    private location: Location,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private service: AuthServiceService
  ) {}

  ngOnInit(): void {
    Emitters.authEmitter.subscribe((auth: boolean) => {
      this.authenticated = auth;
    });

    this.ContactForm = this.formBuilder.group({
      email: '',
      message: '',
      subject: '',
    });

    this.showMenuItems = window.innerWidth > 768;
  }

  validateEmail(email: string): boolean {
    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return email.match(validRegex) !== null;
  }

  sendMessage() {
    const message = this.ContactForm.getRawValue();
    if (
      message.email.trim() === '' ||
      message.message.trim() === '' ||
      message.subject.trim() === ''
    ) {
      this.toastr.warning("Field can't be blank", '', { progressBar: true });
    } else if (!this.validateEmail(message.email)) {
      this.toastr.warning('Please enter a valid email', '', {
        progressBar: true,
      });
    } else {
      this.service.sendMessage(message).subscribe({
        next: (res: any) => {
          console.log(res);
          this.showModal();
          this.toastr.success('Message send Successfully', '', {
            progressBar: true,
          });
        },
        error: (err: any) => {
          this.showModal();
          const errorMessage = err.error.message;
          this.toastr.error(errorMessage, '', { progressBar: true });
        },
      });
    }
  }

  toggleNavbarDropdown() {
    this.isNavbarDropdownOpen = !this.isNavbarDropdownOpen;
  }

  toggleMenuItems() {
    this.showMenuItems = !this.showMenuItems;
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.service.user_logout();
    this.router.navigate(['']);
    window.location.reload();
    Emitters.authEmitter.emit(false);
  }
  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  isDropdownOpen = false;
  dropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  menu() {
    this.showmenu = !this.showmenu;
  }

  showModal() {
    this.isModalOpen = !this.isModalOpen;
  }
}
