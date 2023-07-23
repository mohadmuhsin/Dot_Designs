import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Emitters } from '../emitter/emitter';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private route: Router,
    private formBuilder: FormBuilder,
    private service: AuthServiceService,
    private toastr: ToastrService,
  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: '',
      password: '',
    });
    // const isLoggedIn = localStorage.getItem("admin_token")
    // if(isLoggedIn){
    //   this.route.navigate(['/admin'])
    // }
  }

  validateEmail(email: string): boolean {
    const pattern: RegExp = /^[\w\.-]+@[\w\.-]+\.\w{2,}$/;
    return pattern.test(email);
  }



  login() {
    const admin = this.form.getRawValue();
    if (admin.username.trim() === '' || admin.password.trim() === '') {
      this.toastr.error(`filed can't be empty`,"Warning!");
    } 
    else if(!this.validateEmail(admin.username)){
      this.toastr.error(`Email should be valid`,"Warning!")
    }else{
      this.service.admin_login(admin).subscribe((res:any)=>{
        this.toastr.success(res.message,"Success!")
        localStorage.setItem("admin_token",res.token)
        this.route.navigate(['/admin'])
        Emitters.authEmitter.emit(true)
      },
      (err)=>
      {
        const errorMessage = err.error.message
        this.toastr.error(errorMessage,"Warning!")
      }
      )
    }
  }
}
