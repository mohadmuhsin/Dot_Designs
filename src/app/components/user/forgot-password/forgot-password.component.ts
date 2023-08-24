import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
ForgotPassword!: FormGroup;
  verifiedMail: boolean = false;

  constructor(
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute,
    private service: AuthServiceService,
  ) { }
  

  ngOnInit(): void {
    this.ForgotPassword = this.formBuilder.group({
      email: '',
      password: '',
      confirmPassword: '',
    });
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
