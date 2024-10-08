import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit, } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Emitters } from 'src/app/emitter/emitter';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Subscription } from 'rxjs';
import { Warning } from 'postcss';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  user: SocialUser | null = null;;
  ForgotPassword!: FormGroup;
  verifiedMail: boolean = false;
  signIn: boolean = false;
  private authSubscription!: Subscription;
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private service: AuthServiceService,
    private authService: SocialAuthService
  ) { }

  ngOnInit(): void {
    this.authSubscription = this.authService.authState.subscribe((user) => {
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
      // password: '',
      // confirmPassword: '',
    });
  }

  GoogleLogin() {

    this.authService.authState.subscribe((user) => {
      this.user = user;
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
    this.signIn = true
    const user = this.form.getRawValue();
    if (user.email.trim() === '' || user.password.trim() === '') {
      this.signIn = false
      this.toastr.error('Fields cannot be empty', 'Warning!');
    } else if (!this.validateEmail(user.email)) {
      this.signIn = false;
      this.toastr.error('Email should be valid', 'Warning!');
    } else {
      const method: string = 'normal';
      this.service.login(user, method).subscribe(
        (res: any) => {
          this.signIn = false
          localStorage.setItem('token', res.token);
          localStorage.setItem('userId', res.userid);
          Emitters.authEmitter.emit(true);
          this.router.navigate(['/']);
        },
        (err) => {
          this.signIn = false
          Emitters.authEmitter.emit(false);
          console.log(err);
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
          if (res) {
            this.toastr.warning("Verify your mail", "", { progressBar: true })
          }
          this.verifiedMail = true;
        },
        error: (err: any) => {
          const errorMessage = err.error.message;
          this.toastr.warning(errorMessage, "Warning", { progressBar: true });
        },
      });
    }
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
    this.user = null;
  }

}
