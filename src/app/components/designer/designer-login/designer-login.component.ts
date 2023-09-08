import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SocialAuthService,SocialUser } from '@abacritt/angularx-social-login';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { Emitters } from '../emitter/emitter';
import { SharedDataServiceService } from '../../../services/shared-data-service.service';

@Component({
  selector: 'app-designer-login',
  templateUrl: './designer-login.component.html',
  styleUrls: ['./designer-login.component.css'],
})
export class DesignerLoginComponent implements OnInit {
  form!: FormGroup;
  ForgotPassword!: FormGroup;
  Data: boolean = false;
  designer!:SocialUser
  verifiedMail:boolean = false
  constructor(
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private activeRoute:ActivatedRoute,
    private service: AuthServiceService,
    private authService: SocialAuthService,
    private shareData: SharedDataServiceService,

  ) {}
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: '',
      password: '',
    });

    this.ForgotPassword = this.formBuilder.group({
      email: '',
      password: '',
      confirmPassword:''
    })
    this.shareData.setSharedData(this.Data);

    this.authService.authState.subscribe((user) => {
      this.designer = user;
      if (this.designer) {
        this.loginWithgoogle(this.designer);
      }
    })
  }


  loginWithgoogle(designerData: any) {
     const method:string = "google"
    this.service.designer_login(designerData,method).subscribe((res: any) => {
      localStorage.setItem("designer", res.token)
      localStorage.setItem('designerId',res.data._id)
      this.setSharedData()
      Emitters.authEmitter.emit(true)
      this.router.navigate(['/design_categories'])
    }, (err: any) => {
      const errorMessage = err.error.message
      this.toastr.error(errorMessage, '', { progressBar:true})
    })
  }
  // email validation
  validateEmail(email: string): boolean {
    const pattern: RegExp = /^[\w\.-]+@[\w\.-]+\.\w{2,}$/;
    return pattern.test(email);
  }

  login() {
    const designer = this.form.getRawValue();
     const method:string = "normal"
      const userName = String(designer.email) 
    if (userName.trim() === '' || designer.password.trim()=== '') {
      this.toastr.error(`Fields can't be empty`);
    } else if (!this.validateEmail(designer.email)) {
      this.toastr.warning('Email should be valid',"",{progressBar:true})
    }else{
      this.service.designer_login(designer,method).subscribe((res:any)=>{
        localStorage.setItem("designer", res.token)
        localStorage.setItem('designerId',res.data._id)
        this.setSharedData()
        Emitters.authEmitter.emit(true)
        this.router.navigate(['/design_categories'])
      },(err)=>{
        const errorMessage = err.error.message || "An error occured"
        this.toastr.warning(errorMessage,"",{progressBar:true})
      }
      )
    }
  }
  setSharedData(): void {
    this.shareData.setSharedData(true);
  }
  verifyMail() { 
    const verify = this.ForgotPassword.getRawValue()
    if (!this.validateEmail(verify.email)) {
      this.toastr.warning("Email id is not valid","",{progressBar:true})
    } else {
      this.service.verifyDesignerEmailforForget(verify.email).subscribe({
        next: (res: any)=>{
          this.verifiedMail = true 
        if (res) {
            this.toastr.warning("Verify your mail","",{progressBar:true})
          }  
        },
        error: (err: any) => {
          const errorMessage = err.error.message
          this.toastr.warning(errorMessage,"",{progressBar:true})
        }
      })
    }
  }
  
  
    
}
