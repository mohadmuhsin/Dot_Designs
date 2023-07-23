import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-designer-sign-up',
  templateUrl: './designer-sign-up.component.html',
  styleUrls: ['./designer-sign-up.component.css'],
})
export class DesignerSignUpComponent implements OnInit {
  form!: FormGroup;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private service: AuthServiceService
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: '',
      email: '',
      mobileNumber: '',
      password: '',
    });

    // const isLoggedIn = localStorage.getItem('designer');
    // if (isLoggedIn) {
    //   this.router.navigate(['/designer']);
    // }
  }

  validateEmail(email: string): boolean {
    const pattern: RegExp = /^[\w\.-]+@[\w\.-]+\.\w{2,}$/;
    return pattern.test(email);
  }

  signup() {
    const designer = this.form.getRawValue();
    const phone = String(designer.mobileNumber);
    if (
      designer.name.trim() === '' ||
      designer.email.trim() === '' ||
      phone.trim() === '' ||
      designer.password.trim() === ''
    ) {
      this.toastr.error(`Fields can't be empty`, 'Warning!');
    } else if (!this.validateEmail(designer.email)) {
      console.log('here it is');

      this.toastr.error('Email should be valid', 'Warning!');
    } else {
      console.log('ivde nd');

      this.service.designer_signup(designer).subscribe(
        (res: any) => {
          this.toastr.warning('verify your email', 'warning!');
        },
        (err) => {
          const errorMessage = err.error.message;
          this.toastr.error(errorMessage || 'warning');
        }
      );
    }
  }
}
