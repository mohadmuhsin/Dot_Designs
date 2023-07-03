import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/services/auth-service.service';

// import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private http: HttpClient,
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private service: AuthServiceService
  ) {}
  // private authService: SocialAuthService
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: '',
      email: '',
      mobileNumber: '',
      password: '',
    });
  }

  // user!: SocialUser | null;

  // signInWithGoogle(): void {
  //   this.authService.signIn(GoogleLoginProvider.PROVIDER_ID)
  //     .then(user => {
  //       this.user = user;
  //     })
  //     .catch(err => {
  //       console.log('Sign-in error:', err);
  //     });
  // }

  validateEmail(email: string): boolean {
    // Regular expression pattern for email validation
    const validRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    return email.match(validRegex) !== null;
  }

  signup() {
    const user = this.form.getRawValue();
    if (
      user.name.trim() === '' ||
      user.email.trim() === '' ||
      user.mobileNumber === '' ||
      user.password.trim() === ''
    ) {
      console.log('login');
      this.toastr.error('Fields cannot be empty', 'Warning!');
    } else if (!this.validateEmail(user.email)) {
      this.toastr.error('Email should be valid', 'Warning!');
    } else {
      this.service.signUp(user).subscribe(
        () => {
          console.log("here it is");
          
          this.router.navigate(['/login'])
          this.toastr.warning('verify your email', 'Warning!');
        },
        (err) => {
          const errorMessage = err.error.message;
          this.toastr.error(errorMessage, 'Warning!');
        }
      );
    }
  }
}
