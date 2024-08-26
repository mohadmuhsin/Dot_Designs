import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Emitters } from 'src/app/emitter/emitter';
import { Subscription } from 'rxjs';
import { AuthServiceService } from 'src/app/services/auth-service.service';

// import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  form!: FormGroup;
  signUp: boolean = false;
  user: SocialUser | null = null;
  private authSubscription!: Subscription;
  constructor(
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private service: AuthServiceService,
    private authService: SocialAuthService
  ) { }
  // private authService: SocialAuthService
  ngOnInit(): void {

    this.authSubscription = this.authService.authState.subscribe((user) => {
      this.user = user;
      if (this.user) {
        this.signInWithgoogle(user);
        this.authService.signOut(); // Sign out the user
        this.user = null; // Clear user data
      }

    });
    this.form = this.formBuilder.group({
      name: '',
      email: '',
      mobileNumber: '',
      password: '',
    });

  }


  signInWithgoogle(user: any) {
    this.service.signUp(user, true).subscribe(
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

  signup() {
    this.signUp = true;
    const user = this.form.getRawValue();
    const phone = String(user.mobileNumber);
    if (
      user.name.trim() === '' ||
      user.email.trim() === '' ||
      phone.trim() === '' ||
      user.password.trim() === ''
    ) {
      this.signUp = false
      this.toastr.error('Fields cannot be empty', 'Warning!');
    } else if (!this.validateEmail(user.email)) {
      this.signUp = false
      this.toastr.error('Email should be valid', 'Warning!');
    } else {
      this.signUp = true
      this.service.signUp(user,false).subscribe(
        () => {
          this.router.navigate(['/login']);
          this.toastr.warning('verify your email', 'Warning!');
        },
        (err) => {
          this.signUp = false
          const errorMessage = err.error.message;
          this.toastr.error(errorMessage, 'Warning!');
        }
      );
    }
  }
  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
  }
}
