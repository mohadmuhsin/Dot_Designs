import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-designer-list',
  templateUrl: './designer-list.component.html',
  styleUrls: ['./designer-list.component.css']
})
export class DesignerListComponent implements OnInit{
  designers: any;
  

  constructor(private service: AuthServiceService,
    private toastr: ToastrService,
    private router: Router,

  ) { }

  ngOnInit(): void {
    this.service.getDesignersList().subscribe((res: any) => {
      console.log(res);
      this.designers = res
       this.designers.forEach((designer: any) => {
     console.log(designer.profile.profilePhoto);
        });
    }, (err: { error: { message: any; }; }) => {
      const errorMessage = err.error.message
      this.toastr.error(errorMessage,"Warning",{
        positionClass: 'toast-top-center'
      })
    })
  }


  connectWithDesigner(id: any) {
    console.log("lkfsf");
    
    this.service.connectDesigner(id).subscribe((res: any) => {
      console.log();
      
    }, (err: { error: { message: any; }; }) => {
      const errorMessage = err.error.message
      this.toastr.error(errorMessage, "Warning", {
        positionClass:'toast-top-center'
      })
    })
  }
}
