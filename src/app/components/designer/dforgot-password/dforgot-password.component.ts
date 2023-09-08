import { SocialAuthService } from '@abacritt/angularx-social-login';
import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { SharedDataServiceService } from 'src/app/services/shared-data-service.service';

@Component({
  selector: 'app-dforgot-password',
  templateUrl: './dforgot-password.component.html',
  styleUrls: ['./dforgot-password.component.css']
})
export class DforgotPasswordComponent implements OnInit {

ForgotPassword!: FormGroup;
  designerId: any;
  mail!: string;
 constructor(
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private activeRoute:ActivatedRoute,
    private service: AuthServiceService,
 ) { }
  
  ngOnInit(): void {
      this.activeRoute.paramMap.subscribe((params) => {
      this.designerId = params.get('id');
      });
    
    this.service.getDesignerData(this.designerId).subscribe({
      next: (res: any) => {
        this.mail  = res.mail
      }
    })
    
     this.ForgotPassword = this.formBuilder.group({
      email: '',
      password: '',
      confirmPassword:''
     })
    
  }


  changePassword() {
    const change = this.ForgotPassword.getRawValue()
    if (change.password.trim() === '' || change.confirmPassword.trim() === '') {
      this.toastr.warning("fields can't be empty","",{progressBar:true})
    }
    else if (change.password !== change.confirmPassword) {
      this.toastr.warning("password should be same","",{progressBar:true})
    } else {
      change.email = this.mail
      this.service.changeDesignerPassword(change).subscribe({
        next: (res: any) => {
          console.log(res,"kfkdslfkdl");
          const succesMessage = res.message 
          this.router.navigate(['/designer_login'])
          this.toastr.success(succesMessage||"Password changed successfully","",{progressBar:true})
          
        }, error: (err: any) => {
          const errorMessage = err.error.message 
          this.toastr.warning(errorMessage,"",{progressBar:true})
        }
      })
    }
  }
}
