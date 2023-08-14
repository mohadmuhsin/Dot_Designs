import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { log } from 'console';
import { google } from 'googleapis';
import { ToastrService } from 'ngx-toastr';
import { Emitters } from 'src/app/emitter/emitter';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  user!: SocialUser;
  ForgotPassword!: FormGroup;
  verifiedMail: boolean = false;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private service: AuthServiceService,
    private authService: SocialAuthService
  ) {}

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      if (this.user) {
        this.loginWithgoogle(user);
      }
    });

    this.form = this.formBuilder.group({
      email: '',
      password: '',
    });

    this.ForgotPassword = this.formBuilder.group({
      email: '',
      password: '',
      confirmPassword: '',
    });
  }

  GoogleLogin() {
    console.log('ith call aaaaaaaaaaavnn nd');

    this.authService.authState.subscribe((user) => {
      this.user = user;
      console.log(user, 'sdkjjf');
    });
    this.loginWithgoogle(this.user);
  }

  loginWithgoogle(user: any) {
    const method: string = 'google';
    this.service.login(user, method).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('userId', res.userid);
        Emitters.authEmitter.emit(true);
        this.router.navigate(['/']);
      },
      (err: any) => {
        const errorMessage = err.error.message || 'An error occurred';
        this.toastr.warning(errorMessage, 'Error!');
      }
    );
  }

  validateEmail(email: string): boolean {
    // Regular expression pattern for email validation
    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    return email.match(validRegex) !== null;
  }

  login(): void {
    const user = this.form.getRawValue();
    if (user.email.trim() === '' || user.password.trim() === '') {
      this.toastr.error('Fields cannot be empty', 'Warning!');
    } else if (!this.validateEmail(user.email)) {
      this.toastr.error('Email should be valid', 'Warning!');
    } else {
      const method: string = 'normal';
      this.service.login(user, method).subscribe(
        (res: any) => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('userId', res.userid);
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

  verifyMail() {
    const mail = this.ForgotPassword.getRawValue();
    if (!this.validateEmail(mail.email)) {
      this.toastr.warning('Mail should be valid', '', { progressBar: true });
    } else {
      this.service.verifyEmailforForget(mail.email).subscribe({
        next: (res: any) => {
          this.verifiedMail = true;
        },
        error: (err: any) => {
          const errorMessage = err.error.message;
          this.toastr.warning(errorMessage, '', { progressBar: true });
        },
      });
    }
  }

  changePassword() {
    const change = this.ForgotPassword.getRawValue();
    if (change.password.trim() === '' || change.confirmPassword.trim() === '') {
      this.toastr.warning("fields can't be empty", '', { progressBar: true });
    } else if (change.password !== change.confirmPassword) {
      this.toastr.warning('password should be same', '', { progressBar: true });
    } else {
      this.service.changePassword(change).subscribe({
        next: (res: any) => {
          const succesMessage = res.message;
          const currentRoute = this.activeRoute.snapshot.routeConfig?.path;
          this.router
            .navigateByUrl('/', { skipLocationChange: true })
            .then(() => {
              this.router.navigate([currentRoute]);
            });
          this.toastr.success(
            succesMessage || 'Password changed successfully',
            '',
            { progressBar: true }
          );
        },
        error: (err: any) => {
          const errorMessage = err.error.message;
          this.toastr.warning(errorMessage, '', { progressBar: true });
        },
      });
    }
  }
}
