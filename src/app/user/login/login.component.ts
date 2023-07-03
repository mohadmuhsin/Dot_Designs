import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/services/auth-service.service';

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
        () => {
          this.router.navigate(['/']);
        },
        (err) => {
          const errorMessage = err.error.message || 'An error occurred';
          this.toastr.error(errorMessage, 'Error!');
        }
      );
    }
  }
}
