import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Emitters } from 'src/app/emitter/emitter';
import { AuthServiceService } from 'src/app/services/auth-service.service';
// import { SocialAuthService } from 'angular-social-login';
declare const gapi: any;



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService,
    private service: AuthServiceService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: '',
      password: '',
    });

    // validation
    const isLoggedIn = localStorage.getItem('token');
    if (isLoggedIn) {
      this.router.navigate(['/']);
    }
  }











  ngAfterViewInit() {
    this.renderGoogleSignInButton();
  }

  renderGoogleSignInButton() {
    gapi.load('auth2', () => {
      gapi.auth2.init({
        client_id: '1077974426361-tade7c2faebb1dlkksnpjora3a86rmd5.apps.googleusercontent.com',
      }).then(() => {
        gapi.signin2.render('g_id_signin', {
          'scope': 'profile email',
          'width': 200,
          'height': 50,
          'theme': 'outline',
          'onsuccess': this.onSignIn.bind(this),
        });
      });
    });
  }

  onSignIn(googleUser:any) {
    const profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId());
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail());
  }







  validateEmail(email: string): boolean {
    // Regular expression pattern for email validation
    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    return email.match(validRegex) !== null;
  }

  login(): void {
    const user = this.form.getRawValue();

    if (user.username.trim() === '' || user.password.trim() === '') {
      console.log('login');
      this.toastr.error('Fields cannot be empty', 'Warning!');
    } else if (!this.validateEmail(user.username)) {
      this.toastr.error('Email should be valid', 'Warning!');
    } else {
      this.service.login(user).subscribe(
        (res: any) => {
          localStorage.setItem('token', res.token);
          // localStorage.setItem('id', res.data);
          Emitters.authEmitter.emit(true);
          this.router.navigate(['/']);
        },
        (err) => {
          Emitters.authEmitter.emit(false);
          const errorMessage = err.error.message || 'An error occurred';
          this.toastr.warning(errorMessage, 'Error!');
        }
      );
    }
  }
}
