import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as e from 'cors';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Emitters } from '../emitter/emitter';
import { SharedDataServiceService } from '../shared-data-service.service';

@Component({
  selector: 'app-designer-login',
  templateUrl: './designer-login.component.html',
  styleUrls: ['./designer-login.component.css'],
})
export class DesignerLoginComponent implements OnInit {
  form!: FormGroup;
  Data: boolean = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private service: AuthServiceService,
    private shareData: SharedDataServiceService

  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: '',
      password: '',
    });
    this.shareData.setSharedData(this.Data);
    // const isLoggedIn = localStorage.getItem('designer');
    // if (isLoggedIn) {
    //   this.router.navigate(['/designer']);
    // }
  }
  // email validation
  validateEmail(email: string): boolean {
    const pattern: RegExp = /^[\w\.-]+@[\w\.-]+\.\w{2,}$/;
    return pattern.test(email);
  }

  login() {
    const designer = this.form.getRawValue();
    let  userName = String(designer.username) 
    if (designer.username.trim() === '' || designer.password.trim()=== '') {
      this.toastr.error(`Fields can't be empty`);
    } else if (!this.validateEmail(designer.username)) {
      console.log(this.validateEmail(designer.username.trim()));
      this.toastr.error('Email should be valid',"Warning!")
    }else{
      this.service.designer_login(designer).subscribe((res:any)=>{
        localStorage.setItem("designer",res.token)
        this.setSharedData()
        Emitters.authEmitter.emit(true)
        this.router.navigate(['/designer'])
      },(err)=>{
        const errorMessage = err.error.message || "An error occured"
        this.toastr.error(errorMessage,"Warning!")
      }
      )
    }
  }
  setSharedData(): void {
    this.shareData.setSharedData(true);
  }
    
}
