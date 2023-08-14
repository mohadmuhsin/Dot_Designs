import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-designer-mail-verification',
  templateUrl: './designer-mail-verification.component.html',
  styleUrls: ['./designer-mail-verification.component.css'],
})
export class DesignerMailVerificationComponent implements OnInit {
  designer: any;
  constructor(
    private service: AuthServiceService,
    private toastr: ToastrService,
    private router: Router,
    private activeRoute:ActivatedRoute
  ) {}
    token!:number
    id!:number

  ngOnInit(): void {
      this.activeRoute.params.subscribe((params:any)=>{
        this.id= params['id']
        this.token = params['token']
      })
    this.service.getDesignerData(this.id).subscribe({
      next: (res: any)=>{
        console.log(res);
        this.designer = res.designer.entity_name
        
      }
    })
  }
  verify() {
    this.service.verify_designer_email(this.id,this.token).subscribe((res:any)=>{
      this.router.navigate(['/designer'])
      this.toastr.success("E-mail verified","Success")
    },(err)=>{
      const errorMessage = err.error.message
      this.toastr.error(errorMessage,"Warning!")
    }
    )
  }
}
